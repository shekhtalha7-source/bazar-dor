import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, db } from "./db";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "https://bazar-dor-three-ivory.vercel.app",
    "http://localhost:3000",
  ],
 database: mongodbAdapter(db, { client }),
 emailAndPassword: {
 enabled: true,
},
 account: {
 accountLinking: {
enabled: true,
 trustedProviders: ["google", "github"],
 },
 },
 socialProviders: {
 github: {
 clientId: process.env.GITHUB_CLIENT_ID as string,
 clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
 },
 google: {
 clientId: process.env.GOOGLE_CLIENT_ID as string,
clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
 },
 },
});