import { betterAuth } from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb"
import { MongoClient } from "mongodb";
import { getDb } from "./db";
import clientPromise from "./mogodb";


const client = clientPromise

export const auth = betterAuth({
  adapter: mongodbAdapter( await getDb(), {
    client: await client
  }),
  
  emailAndPassword: {
    enabled: true,
  },
  socialProviders:{
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID!,
  },
  facebook: {
    enabled: true,
    clientId: process.env.FACEBOOK_CLIENT_ID!, 
  },
  },
  user:{
    additionalFields:{
      role:{
        type: "string",
        defaultValue:"tenant"
      },
      avatar:{
        type: "string",
        optional:true
      }
    }
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseUrl: process.env.BETTER_AUTH_URL!,
});