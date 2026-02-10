import { getMyChatRooms } from "@/actions/chat.actions";
import { auth } from "@/auth";
import { ChatList } from "@/components/chats/ChatList";
import { ChatRoom } from "@/types/chat";
import { ChatRoomDTO } from "@/types/chat.dto";
import { redirect } from "next/navigation";

const page = async () => {
  
  
  const session = await auth();
  if (!session || session.user.role !== "tenant") {
    redirect("/");
  }
  const result = await getMyChatRooms();
  if (!result.success) {
   
    return (  
      <main className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Failed to load chat rooms</p>
      </main>
    );
  }

  const chatRooms = result.chatRooms;


  return (


    <main>
      <ChatList chats={chatRooms as ChatRoomDTO[]} />
    </main>
  );
};

export default page;
