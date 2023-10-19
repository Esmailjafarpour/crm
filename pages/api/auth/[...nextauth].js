import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "../../../lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"; 

const authOptions = {
     providers: [
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          })
     ],
     adapter: MongoDBAdapter(clientPromise),
}


export default NextAuth(authOptions)