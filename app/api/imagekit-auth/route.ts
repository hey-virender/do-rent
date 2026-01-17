import {getUploadAuthParams} from "@imagekit/next/server"

export async function GET(){
  const {token,expire,signature} = await getUploadAuthParams({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY!,
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY!,
  });
  return new Response(JSON.stringify({
    token,
    expire,
    signature,
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY!,
  }),{
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
