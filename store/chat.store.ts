import { ChatRoom } from "@/types/chat";
import {create} from "zustand";

interface ChatState {
  chatRooms: ChatRoom[];
  activeChatRoom: ChatRoom | null;
  setChatRooms: (chatRooms: ChatRoom[]) => void;
  setActiveChatRoom: (chatRoom: ChatRoom | null) => void;
  addMessageToChatRoom: (chatRoomId: string, message: ChatRoom['messages'][number]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chatRooms: [],
  activeChatRoom: null,
  setChatRooms: (chatRooms) => set(() => ({ chatRooms })),
  setActiveChatRoom: (chatRoom) => set(() => ({ activeChatRoom: chatRoom })),
  addMessageToChatRoom: (chatRoomId, message) =>
    set((state) => ({
      chatRooms: state.chatRooms.map((room) =>
        room.id === chatRoomId
          ? { ...room, messages: [...room.messages, message] }
          : room
      ),
      activeChatRoom: state.activeChatRoom && state.activeChatRoom.id === chatRoomId
        ? { ...state.activeChatRoom, messages: [...state.activeChatRoom.messages, message] }
        : state.activeChatRoom
    })),
    
}))