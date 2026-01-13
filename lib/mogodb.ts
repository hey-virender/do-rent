import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) throw new Error("Mongodb uri is missing");


let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if(process.env.NODE_ENV === "development"){
  if(!global._mongoClientPromise){
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}else{
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}


export default clientPromise;