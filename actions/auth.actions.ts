"use server"
import {registerSchema}  from "@/validations/auth.validation";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import {ObjectId} from "mongodb";


export async function registerUser(input: unknown){
 try {
   const parsed = registerSchema.safeParse(input);
  if(!parsed.success){
    return {success:false,errors: "Data validation failed" };
  }
  const {name, email, password, avatar, role, phone, adhaarNumber, gender, dob} = parsed.data;

 const result = await auth.api.signUpEmail({
  body:{
    name,
  email,
  password,
  avatar: avatar || "",
  },
 })
 if(!result.user){
    return {success:false, errors:"User registration failed"};
  }
  console.log(result)
  const userId = result.user.id;
  
  const db = await getDb();

  await db.collection("profiles").insertOne({
    userId,
    name,
    email,
    role,
    phone,
    adhaarNumber,
    gender,
    dob,
    avatar: avatar || "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.collection("kyc_profiles").insertOne({
    userId,
    adhaarEncrypted: adhaarNumber,
    status: "pending",
    createdAt: new Date(),
  })

  return {success:true};
 } catch (error) {
  console.error("Registration error:", error);
  return {success:false, errors: "An unexpected error occurred during registration" };
 }

}