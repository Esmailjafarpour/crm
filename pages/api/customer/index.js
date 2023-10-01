import connectDB from "@/utils/connectDB";
import Customer from "@/models/Customer";

export default async function handler(req , res) {
     
     try {
          await connectDB()
     } catch (error) {
          console.log("error in the api customer",error)
          res.status(500).json({status : "failed", message : "Error in connection to DB"})
          return;
     }

     if (req.method === "POST") {
          const data = req.body.data;

          if (!data.name || !data.lastName || !data.email) {
               return res.status(400).json({status :"failed" , message : "Invalid data"})
          }

          try {
               const customer = await Customer.create( data )
               res.status(201).json({status : "success", message : "data created" , data : customer})
          } catch (error) {
               console.log("error for create Customer model")
               res.status(500).json({status : "failed" , message : "Error in storing data in DB"})
          }
     }

}