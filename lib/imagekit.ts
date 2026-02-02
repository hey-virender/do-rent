import ImageKit from "@imagekit/nodejs"
import { id } from "date-fns/locale";


const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
})


