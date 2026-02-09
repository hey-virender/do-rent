'use server'

import {prisma} from '@/lib/prisma'
import {auth} from '@/auth'


export async function getOrCreateChat({propertyId}: {propertyId: string}) {
  if(!propertyId) {
    return {success: false, error: 'Property ID is required'}
  }
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return {success: false, error: 'Unauthorized'}
  }
  if(session.user.role !== "tenant") {
    return {success: false, error: 'Only tenants can initiate chats'}
  }
  const property = await prisma.property.findUnique({
    where: {id: propertyId},
    select:{landlordId: true}
  })
  if(!property) {
    return {success: false, error: 'Property not found'}
  }

  const tenantId = session.user.id;
  const landlordId = property.landlordId;
  if(!landlordId) {
    return {success: false, error: 'Landlord not found for this property'}
  }
  if(landlordId === tenantId) {
    return {success: false, error: 'You cannot chat with yourself'}
  }

  const existingChatRoom = await prisma.chatRoom.findFirst({
    where: {
      tenantId,
      landlordId,
      propertyId
    }
  })
  if(existingChatRoom) {
    return {success: true, chatRoom: existingChatRoom}
  }
  const newChatRoom = await prisma.chatRoom.create({
    data: {
      tenantId,
      landlordId,
      propertyId
    }
  })
  return {success: true, chatRoom: newChatRoom}
}

export async function sendMessage({chatRoomId,text}:{chatRoomId: string, text: string}) {
  if(!chatRoomId){
    return {success: false, error: 'Chat Room ID is required'}
  }
  if(!text || text.trim() === '') {
    return {success: false, error: 'Message text cannot be empty'}
  }
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return {success: false, error: 'Unauthorized'}
  }
  const userId = session.user.id;

  const chatRoom = await prisma.chatRoom.findUnique({
    where: {id: chatRoomId},
    select: {tenantId: true, landlordId: true}
  })
  if(!chatRoom) {
    return {success: false, error: 'Chat Room not found'}
  }
  const isAuthorized = userId === chatRoom.tenantId || userId === chatRoom.landlordId
  if(!isAuthorized) {
    return {success: false, error: 'You are not a participant of this chat room'}
  }
  const message = await prisma.message.create({
    data:{
      chatRoomId,
      senderId: userId,
      text: text.trim()
    }
  })
   await prisma.chatRoom.update({
    where: { id: chatRoomId },
    data: { updatedAt: new Date() },
  });
  return {success: true, message}
}