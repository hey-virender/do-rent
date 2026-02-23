import React, { useEffect } from 'react'
import { ChatList } from '../chats/ChatList'
import { getMyChatRooms } from '@/actions/chat.actions';
import { ChatRoomDTO } from '@/types/chat.dto';
import { toast } from 'sonner';

const Chat = () => {
  const [chats, setChats] = React.useState<ChatRoomDTO[]>([]);
  useEffect(() => {
    const fetchChats = async () => {
      const result = await getMyChatRooms()
      if(result.success && result.chatRooms) {
        setChats(result?.chatRooms)
      } else {
        toast.error("Failed to fetch chat rooms")
      }
    }
    fetchChats();
  }, [])
  return (
    <main>
      
      <ChatList chats={chats} />
    </main>
  )
}

export default Chat