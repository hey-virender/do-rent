import { ChatRoom } from "@/types/chat";
import {create} from "zustand";

interface ChatState {
  chatRooms: ChatRoom[];
  
  setChatRooms: (chatRooms: ChatRoom[]) => void;

  addMessageToChatRoom: (chatRoomId: string, message: ChatRoom['messages'][number]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chatRooms: [],
  setChatRooms: (chatRooms) => set(() => ({ chatRooms })),
  addMessageToChatRoom: (chatRoomId, message) =>
    set((state) => ({
      chatRooms: state.chatRooms.map((room) =>
        room.id === chatRoomId
          ? { ...room, messages: [ message] }
          : room
      )
    })),
    
}))