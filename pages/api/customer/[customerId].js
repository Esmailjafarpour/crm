import connectDB from "@/utils/connectDB";
import Customer from "@/models/Customer";

export default async function handler(req , res) {
     
     try {
          await connectDB();
     } catch (error) {
          console.log("error in connect to the database",error.message)
          res.status(500).json({status : "failed" , message : "Error in connection to DB"})
     }

     if (req.method === "GET") {
          const id = req.query.customerId;
          try {
               const customer = await Customer.findOne({_id : id})
               console.log(Customer)
               res.status(200).json({status : "success" , message : "recive data" , data : customer})
          } catch (error) {
               console.log(error.message)
               res.status(500).json({status : "failed" , message : "Error in deleting data from database"})
          }
     }
}