import {Schema , models , model } from "mongoose";

const customerSchema = new Schema({
     name : {
          type : String,
          required : true,
          minLength : 2
     },
     lastName : {
          type : String,
          required : true,
          minLength : 2
     },
     email : {
          type : String,
          required : true,
          minLength : 2
     },
     phone : String,
     address : String,
     postalCode : String,
     date : Date,
     products : {
          type : Array,
          default : [],
     },
     createAt : {
          type : Date,
          default : () => Date.now(),
          immutable : true
     },
     updateAt : {
          type : Date,
          default : () => Date.now(),
     }
})

const Customer = models.Customer || model("Customer" , customerSchema);

export default Customer;