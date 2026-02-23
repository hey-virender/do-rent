import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ chatRoomId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 })
  }

  const userId = session.user.id
  const { chatRoomId } = await params
 

  if (!chatRoomId) {
    return new Response("Chat Room ID is required", { status: 400 })
  }

  const chatRoom = await prisma.chatRoom.findUnique({
    where: { id: chatRoomId },
    select: { tenantId: true, landlordId: true },
  })

  if (!chatRoom) {
    return new Response("Chat Room not found", { status: 404 })
  }

  if (userId !== chatRoom.tenantId && userId !== chatRoom.landlordId) {
    return new Response("Forbidden", { status: 403 })
  }

  const encoder = new TextEncoder()

  // 🔑 Start cursor at "now" to avoid duplicates
  let lastTimestamp = new Date()

  const stream = new ReadableStream({
    start(controller) {
      const send = (payload: any) => {
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
          )
        } catch {
          controller.close()
        }
      }

      // 🔄 Heartbeat
      const heartbeat = setInterval(() => {
        send({ type: "ping" })
      }, 20000)

      // 🔍 Polling (reduced frequency)
      const poll = setInterval(async () => {
        try {
          const messages = await prisma.message.findMany({
            where: {
              chatRoomId,
              createdAt: { gt: lastTimestamp },
            },
            orderBy: { createdAt: "asc" },
          })

          for (const message of messages) {
            lastTimestamp = message.createdAt
            send({
              type: "message",
              chatRoomId,
              message,
            })
          }
        } catch (err) {
          send({ type: "error", message: "Polling failed" })
        }
      }, 2000)

      req.signal.addEventListener("abort", () => {
        clearInterval(poll)
        clearInterval(heartbeat)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
