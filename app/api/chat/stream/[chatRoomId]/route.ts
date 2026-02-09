import {prisma} from "@/lib/prisma";
import {auth} from "@/auth";
import { set } from "zod";


export async function GET(req:Request,{params}:{params:{chatRoomId: string}}) {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return new Response(JSON.stringify({success: false, error: 'Unauthorized'}), {status: 401})
  }
  const userId = session.user.id;
  const chatRoomId = params.chatRoomId;
  if(!chatRoomId) {
    return new Response(JSON.stringify({success: false, error: 'Chat Room ID is required'}), {status: 400})
  }
  const chatRoom = await prisma.chatRoom.findUnique({
    where: {id: chatRoomId},
    select: {tenantId: true, landlordId: true}
  })

  if(!chatRoom || (userId !== chatRoom.tenantId && userId !== chatRoom.landlordId)) {
    return new Response(JSON.stringify({success: false, error: 'Chat Room not found or access denied'}), {status: 404})
  }

  const encoder = new TextEncoder();
  let lastTimestamp = new Date(0);

  const stream = new ReadableStream({
    async start(controller){
      const send = (data:any) =>{
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
      )
      }
      const heartbeat = setInterval(() => {
        send({type:"ping"})
      },15000)

      const poll = setInterval(async () => {
        const messages = await prisma.message.findMany({
          where: {
            chatRoomId,
            createdAt: {gt: lastTimestamp}
          },
          orderBy: {createdAt: "asc"}
      })
      for(const message of messages) {
        lastTimestamp = message.createdAt;
        send(message)
      }
    },1200)
    req.signal.addEventListener("abort",()=>{
      clearInterval(poll)
      clearInterval(heartbeat)
      controller.close()
    })
  }
  })

  return new Response(stream,{
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    }
  })
}