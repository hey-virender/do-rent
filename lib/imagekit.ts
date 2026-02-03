import { ImageAsset } from "@/types/type"
import ImageKit from "@imagekit/nodejs"



export const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
})

 export const updateImageMetaData = async (image: ImageAsset,metaData:{[key:string]: string}) => {
   try {
    await imagekit.files.update(image.fileId, {
      customMetadata: metaData,
    })
    console.log(`Updated metadata for image ${image.fileId}`)
   } catch (error) {
     console.log(`Failed to update metadata for image ${image.fileId}:`, error)
   }
  }


