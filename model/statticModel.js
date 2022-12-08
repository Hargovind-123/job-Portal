const mongoose = require('mongoose')
const schema = require('mongoose').Schema
const staticShema = new schema({
    type:{type:String,  require:true},
    title:{type:String,  require: true},
    description:{type:String, require:true},
    status:{type:String,  require:true},     
})
const staticModel = mongoose.model("admin", staticShema)
module.exports = staticModel

mongoose.model("admin", staticShema). findOne({userType:{$in:"ADMIN"}},(err, res)=>{
  if(err){
    console.log("server error");

  } 
  else if(res){
    console.log("content is already exist ");
  } 
  else{
    let obj1={
        status:"ACTIVE",
        title:"Become Dealer",
        type:"Links",
        description:"Dealer Registration (personal information)"
    }
    let obj2={
        status:"ACTIVE",
        title:"News",
        type:"Links",
        description:""
    }
    let obj3={
        status:"ACTIVE",
        title:"About Us",
        type:"Links",
        description:""
    }
    let obj4={
        status:"ACTIVE",
        title:"FAQ's",
        type:"Links",
        description:"Repair& Service Request>>, Return for Credit,  Request For Advance Replacemaent, seacrch Eyematic konowlwgde center, need technical Assisteance"
    }
    let obj5={
        status:"ACTIVE",
        title:"Privacy And Policy",
        type:"Links",
        description:""
    }
    let obj6={
        status:"ACTIVE",
        title:"Support",
        type:"Links",
        description:""
    }
    let obj7={
        status:"ACTIVE",
        title:"Contact Us",
        type:"Links",
        description:""
    }
    mongoose.model('admin', staticShema).create(obj1, obj2, obj3, obj4,obj5, obj6, obj7,(err, res)=>{
      if(err){
        console.log('error');
      }else{
        console.log('static content is saved defult', res)
      }
    })
  }
})