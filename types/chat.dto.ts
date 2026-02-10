// types/chat.dto.ts
export type MessageDTO = {
  id: string
  text: string
  senderId: string
  seen: boolean
  createdAt: Date
}

export type ChatRoomDTO = {
  id: string
  createdAt: Date
  updatedAt: Date

  property: {
    id: string
    name: string
  } | null

  landlord: {
    id: string
    name: string | null
    avatarUrl?: string
  } | null

  tenant: {
    id: string
    name: string | null
    avatarUrl?: string
  } | null

  messages: MessageDTO[]
}
