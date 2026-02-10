import React, { useEffect } from 'react'
import { ChatList } from '../chats/ChatList'
import { getMyChatRooms } from '@/actions/chat.actions';
import { ChatRoom } from '@/types/chat';
import { ChatRoomDTO } from '@/types/chat.dto';

const Chat = () => {
  const [chats, setChats] = React.useState<ChatRoomDTO[]>([]);
  useEffect(() => {
    const fetchChats = async () => {
      const result = await getMyChatRooms()
      if(result.success && result.chatRooms) {
        setChats(result?.chatRooms)
      } else {
        console.error("Failed to fetch chat rooms:", result.error);
      }
    }
    fetchChats();
  }, [])
  return (
    <main>
      <h1>Chat</h1>
      <ChatList chats={chats} />
    </main>
  )
}

export default Chat