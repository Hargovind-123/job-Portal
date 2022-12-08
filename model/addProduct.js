const { urlencoded } = require('express');
const mongoose = require('mongoose');
const schema = require('mongoose').Schema
const mongoosePaginate = require('mongoose-paginate');
const productSchema = new schema({
userId:{
   type: mongoose.Schema.Types.ObjectId, ref:"ADMIN"
},
productName:{
 type:String, require:true
},
price:{
	type:String, require:true
},
quantity:{
	type:String, require:true
},
discount:{
	type:String, require:true
},
gst:{
	type:String, require:true
},
image:{
	type:String, require: true,

},
date:{
	type:Date, require:true,
	
	default:Date.now()
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
productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model("product", productSchema)
module.exports= productModel;
