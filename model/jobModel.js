const mongoose = require('mongoose');
const schema = require('mongoose').Schema
const mongoosePaginate = require('mongoose-paginate');
const jobSchema = new schema({
userId:{
   type: mongoose.Schema.Types.ObjectId, ref:"ADMIN"
},
category:{
 type:String, require:true
},
jobType:{
	type:String, require:true
},
company:{
	type:String, require:true
},
jobLocation:{
	type:String, require:true
},
jobTitle:{
	type:String, require:true
},
vacancy:{
	type:Number, require:true
},
lastDate:{
type: String, require:true
},
skillNeeded:{
	type:String, require:true
},
minWorkExperience:{
	type:String, require:true
},
maxWorkExperience:{
	type:String, require:true
},
MinAnnualCTC:{
	type:Number, require:true
},
MaxAnnualCTC:{
	type:Number, require:true
},
currency:{
	type:String, require:true
},
qualification:{
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
jobSchema.plugin(mongoosePaginate)
const jobModel = mongoose.model("Job",jobSchema)
module.exports=jobModel;
