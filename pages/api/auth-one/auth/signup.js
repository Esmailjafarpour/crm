import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";

async function handler(req , res) {

     if(req.method !== "POST"){
          return
     }

     try {
          await connectDB();
     } catch (error) {
          console.log("error from api signup",error.message)
          return res.status(500).json({status : "failed" , message : "Error in connecting to DB"});
     }

     const { email , password } = req.body;

     if (!email || !password ) {
          return res.status(422).json({status : "failed" , message : "Invalid Data"})
     }

     const existingUser = await User.findOne({email : email});

     if (existingUser) {
         return res.status(422).json({status : "failed" , message : "User exists already!"})
     }

     const hashedPassword = await hashPassword(password)
     console.log(hashedPassword)
     const newUser = await User.create({email : email , password : hashedPassword})
     // console.log("newUser", newUser)
     res.status(201).json({status : "success" , message : "User Created!"})

}

export default handler;