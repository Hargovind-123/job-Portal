const { urlencoded } = require('express');
const mongoose = require('mongoose');
const schema = require('mongoose').Schema
const mongoosePaginate = require('mongoose-paginate');
const customerSchema = new schema({
userId:{
 type: mongoose.Schema.Types.ObjectId, ref:"ADMIN"
},
customerName:{
      type: String, require:true,
},
companyName:{
   type:String, require:true,
},
contactNumber:{
   type:String, require:true,
},
email:{
   type:String, require:true,
},
address:{
   type:String, require:true,
},
city:{
   type:String, require:true,
},
country:{
   type:String, require:true,
},
zipCode:{
   type:String, require:true,
},
userType:{
type:String,
enums:["ADMIN" , "USER"],
default: "ADMIN",
},
status:{
type:String,
enums:["ACTIVE", "BLOCK" , "DELETE"],
default:"ACTIVE",
},
},
{timestamps:true}
);

customerSchema.plugin(mongoosePaginate)
const customerModel = mongoose.model("customer", customerSchema);
module.exports = customerModel;


