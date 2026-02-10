import { HouseListing } from "./house"
import { Ref } from "./type"
import { User } from "./user"


export interface Message {
  id: string
  chatRoomId: string
  senderId: string
  text: string
  seen: boolean
  createdAt: Date
  
}

export interface ChatRoom {
  id: string
  tenantId: string
  landlordId: string
  propertyId: string
  createdAt: Date
  updatedAt: Date
  landlord: Partial<User>
  tenant: Partial<User>
  property: Partial<HouseListing>
  messages: Message[]
}