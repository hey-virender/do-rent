import { getChatById } from "@/actions/chat.actions";
import { auth } from "@/auth";
import { ChatWindow } from "@/components/chats/ChatWindow";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session || session.user.role !== "tenant") {
    toast.error("Unauthorized access");
    redirect("/");
  }

  const { id } = await params;
  const chatRoom = await getChatById({chatRoomId: id});
  if (!chatRoom.success || !chatRoom.chatRoom) {
    toast.error(chatRoom.error || "Failed to load chat room");
    redirect("/");
  }
  console.log("Chat Room Data:", chatRoom.chatRoom);

  return (
    <div>
      <ChatWindow chatRoom={chatRoom?.chatRoom} />
    </div>
  );
};

export default page;
