import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("MONGODB_URI .env.local-এ পাওয়া যায়নি");
}

// dev মোডে বারবার নতুন সংযোগ খুলে না যায়, তাই global-এ রাখা হয়
const globalForMongo = globalThis as unknown as {
  _mongoClient?: MongoClient;
};

export const client =
  globalForMongo._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

export const db = client.db("bazardor");