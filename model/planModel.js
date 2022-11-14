const mongoose = require('mongoose');
const schema = require('mongoose').Schema
const mongoosePaginate = require('mongoose-paginate');
const planSchema = new schema({
userId:{
   type: mongoose.Schema.Types.ObjectId, ref:"ADMIN"
},
planName:{
 type:String, require:true
},
price:{
	type:String, require:true
},
currency:{
	type:String, require:true
},
description:{
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
planSchema.plugin(mongoosePaginate)
const planModel = mongoose.model("Plan",planSchema)
module.exports=planModel;
