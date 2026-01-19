'use server'
import {auth} from "@/auth";
import { prisma } from "@/lib/prisma";
import { prismaUpdateFilter } from "@/lib/utils";
import { User } from "@/types/user";
import { updateProfileSchema } from "@/validations/profile.validations";
import { success } from "zod";
export async function getMyProfile() {

  const session = await auth();
  if(!session?.user){
    return {
      success: false,
      error: "Not authenticated",
    }
  }

  const userProfile = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  const userAccount = await prisma.profile.findUnique({
    where: { userId: userProfile?.id! },
    select: {
      avatarUrl:true,
      gender:true,
      phone:true,
      address:true,
      bio:true,
    },
  })

  return {
    ...userProfile,
    ...userAccount,
  }

}

export async function updateMyProfile(data: Partial<User>){
  const session = await auth();

  
  if(!session?.user){
    return {
      success: false,
      error: "Not authenticated",
    }
  }

  const parsed = updateProfileSchema.safeParse(data);
  if(!parsed.success){
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    }
  }
  
  const updateData = prismaUpdateFilter(parsed.data);

  if(Object.keys(updateData).length === 0){
    return {
      success: true,
      message: "No changes made",
    }
  }
  const {name, ...userData} = updateData;
  if(name){
    await prisma.user.update({
      where: { id: session.user.id! },
      data: { name },
    })
  }
  await prisma.profile.update({
    where: { userId: session.user.id! },
    data: userData,
  })

  return {
    success: true,
    message: "Profile updated successfully",
  }
}

export async function changeAvatar(avatarUrl: string,fileId: string){
  const session = await auth();
  if(!session?.user){
    return {
      success: false,
      error: "Not authenticated",
    }
  }
  await prisma.profile.update({
    where: { userId: session.user.id! },
    data: { avatarUrl,avatarFileId: fileId },
  })
  return {
    success: true,
    message: "Avatar updated successfully",
  }
}