import {z}  from "zod";

export const profileSchema = z.object({
  userId:z.string(),
  name: z.string().min(2).max(100),
  gender:z.enum(["male","female","other"]),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  phone: z.string().min(10).max(15),
  address: z.string().min(5).max(200),
})