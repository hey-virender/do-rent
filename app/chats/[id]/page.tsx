import { getChatById } from "@/actions/chat.actions";
import { auth } from "@/auth";
import { ChatWindow } from "@/components/chats/ChatWindow";
import { redirect } from "next/navigation";


const page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    
    redirect("/");
  }

  const { id } = await params;
  const chatRoom = await getChatById({chatRoomId: id});
  if (!chatRoom.success || !chatRoom.chatRoom) {
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
