import clientPromise from "./mogodb";

export async function getDb() {
  const client = await clientPromise;
  return client.db("do-rent");
}