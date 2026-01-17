import {z} from "zod";


export const updateProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
    bio: z.string().max(500, "Bio must be at most 500 characters").nullable(),
    address: z.string().max(200, "Address must be at most 200 characters").nullable(),
    gender: z.enum(["male", "female", "other"]),
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be at most 15 digits").nullable(),
    

  
})