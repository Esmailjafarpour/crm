 import connectDB from "@/utils/connectDB";
 import { hashPassword } from "@/utils/auth";
 import User from "@/models/User";

 async function handler (req , res){
     if (req.method !== "POST") return
     
     try {
          await connectDB();
     } catch (error) {
          console.log("error in the signup api")
          return res.status(500).json({status : "success" , message :"Error in connecting to DB"})
     }

      const { email , password } = req.body;

      if (!email || !password) {
          return res.status(422).json({status : "failed" , message :"Invalid data"})
      }

      const existingUser = await User.findOne({email : email})

      if (existingUser) {
          return res.status(422).json({status : "failed" , message : "User exists already"})
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await User.create({email : email , password : hashedPassword})
      console.log("newUser" , newUser)

      return res.status(201).json({ status :"success" , message : "Created User!"})

 }

 export default handler;