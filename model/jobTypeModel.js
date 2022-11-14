const mongoose = require('mongoose');
const schema = require('mongoose').Schema
const mongoosePaginate = require('mongoose-paginate');
const jobTypeSchema = new schema({
userId:{
   type: mongoose.Schema.Types.ObjectId, ref:"ADMIN"
},
jobType:{
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
jobTypeSchema.plugin(mongoosePaginate)
const jobTypeModel = mongoose.model("jobType",jobTypeSchema)
module.exports=jobTypeModel;
