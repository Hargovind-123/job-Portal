const mongoose = require('mongoose');
const schema = require('mongoose').Schema
const mongoosePaginate = require('mongoose-paginate');
const jobskillSchema = new schema({
userId:{
   type: mongoose.Schema.Types.ObjectId, ref:"ADMIN"
},
skills:{
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
jobskillSchema.plugin(mongoosePaginate)
const jobSkillsModel = mongoose.model("Skills",jobskillSchema)
module.exports= jobSkillsModel;
