import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// const authOptions = {
//   session: { strategy: "jwt" },
//   providers: [
//     CredentialsProvider({
//       // create form
//        
//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//           placeholder: "Enter Your Email",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentails, req) {
//         return { name: "nader" };
//       },
//     }),
//   ],
//   // go to signin page
//   pages : {
//     signIn : "../../next-auth/signin"
//   }
// };

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const {email , password , name , lastName } = credentials;
        try {
          await connectDB();
        } catch (error) {
          throw new Error("Error to connection to DB")
        }

        if (!email || !password) {
          throw new Error("Invalid data")
        }

        const user = await User.findOne({email : email})
        if (!user) {
          throw new Error("user doesn't exist!")
        }

        const isValid = await verifyPassword(password , user.password)
        if (!isValid) {
          throw new Error("Username or Password is incorrect!")
        }
        console.log("...nextAuth",email,password,name,lastName)
        
        return{email , name , lastName}
      },
    }),
  ],
};

export default NextAuth(authOptions);
