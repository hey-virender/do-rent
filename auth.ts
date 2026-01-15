import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
export const {handlers,signIn,signOut,auth}  = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials:({
        email: { },
        password: { }
      }
    ),
    authorize: async (credentials) => {
      let user = null;
      ;
      user = await prisma.user.findFirst({
        where:{
          email:credentials?.email as string,
        }
      })
      if(!user){
        throw new Error("No user found with the given email")
      }
    
     const isValid = compare(credentials?.password as string,user.password!)
      if(!isValid){
        throw new Error("Incorrect password")
      }
      console.log("Authenticated user:", user);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as "tenant" | "landlord" | "admin"
      };
    }
    })
  ],
  session:{
    strategy:"jwt"
  },
  callbacks:{
    async jwt({token,user}){
      console.log("JWT callback - user:", user);
      console.log("JWT callback - token before modification:", token);
      if(user){
        token.id = user.id ;
        token.role = user.role as "tenant" | "landlord" | "admin";
        token.name = user.name;
        token.email = user.email;
      }
      console.log("JWT callback - token after modification:", token);
      return token;
    },
    async session({session,token,user}){
      console.log("Session callback - user:", user);
      console.log("Session callback - session before modification:", session);
      if (!session.user) return session
    if (!token?.id) return session

        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.role = token.role as "tenant" | "landlord" | "admin";
      
      console.log("Session callback - session after modification:", session);
      return session;
    },
    

    
    
  },
  pages:{
    signIn:"/login",
    
  },
  secret: process.env.AUTH_SECRET,

})