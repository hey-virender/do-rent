import {z}  from "zod";

export const profileSchema = z.object({
  _id:z.string(),
  name: z.string().min(2).max(100),
  adhaarNumber: z.string().min(12).max(12).nullable(),
  email: z.string().email(),
  gender:z.enum(["male","female","other"]),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  phone: z.string().min(10).max(15),
  address: z.string().min(5).max(200).nullable(),
  role: z.enum(["tenant", "landlord", "admin"]),
  avatar: z.string().url().optional(),

})