import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { verifyPassword } from "@/utils/auth";

async function handler (req , res){
     if (req.method !== "POST") {
          return
     }

     try {
          await connectDB();
     } catch (error) {
          console.log("error in the api signin", error.message)
          res.status(500).json({status : "failed" , message : "Error Connecting To DB"})
     }

     const { email , password } = req.body;

     if (!email || !password) {
          return res.status(422).json({status : "failed" , message : "Invalid Data"})
     }

     const user = await User.findOne({email : email})

     if (!user) {
          return res.status(404).json({status : "failed" , message : "User doesn't exist!"})
     }

     const isValid = await verifyPassword(password , user.password)

     if (!isValid) {
          return res.status(422).json({status : "failed" , message : "Username Or Password is incorrect!"})
     }
}

export default handler;