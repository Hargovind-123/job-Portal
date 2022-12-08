const { urlencoded } = require('express');
const mongoose = require('mongoose');
const schema = require('mongoose').Schema
const mongoosePaginate = require('mongoose-paginate');
const companySchema = new schema({
userId:{
   type: mongoose.Schema.Types.ObjectId, ref:"ADMIN"
},
companyName:{
 type:String, require:true
},
personName:{
	type:String, require:true
},
gstNumber:{
	type: String, require:true
},
mobileNumber:{
	type:String, require:true
},
email:{
	type:String, require:true
},
address:{
	type: String, require:true
},

city:{
type: String, require:true
},
pinCode:{
	type:String, require:true
},
website:{
	type:String, require:true
},

userType:{
	type:String, enum:["ADMIN", "USER"],default:"ADMIN"
	
},
status:{type:String, enum:["ACTIVE", "DELETE"], default:"ACTIVE"}
},
{
	timestamps:true
}
)
companySchema.plugin(mongoosePaginate)
const companyModel = mongoose.model("company",companySchema)
module.exports= companyModel;
