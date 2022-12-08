const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const validator = require('validator')
const schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const userSchema = new schema({
   
    name:{
        type:String, require:true,
        maxlength: 50
  
    },
  
    address:{type:String, require:true,
    maxlength: 100     
    }, 
   
    mobileNumber:{
       type:String, require:true,
       maxlength: 10
    },

	 email:{
        type:String, require:true,
        trim: true,
        unique: 1
    },
    
    password:{
        type:String, require:true,
    },   

    otp:{
    type:Number, require:true,
},

expTime:{
    type:String, require: true,
},

otpvarification:{
    type:Boolean, require:true,
    default:false
},
image:{
    type:String, require:true
},
userType:{
    type: String,
    enum:["ADMIN","USER"],
    default: "USER"
},
status:{
    type:String,
    enum:["ACTIVE", "BLOCK","DELETE",],
    default:"ACTIVE"
},
  
},
{timestamps:true}

);
userSchema.plugin(mongoosePaginate)
    const userModel = mongoose.model("user", userSchema);
    module.exports = userModel; 
    userModel.findOne({status:{$ne:"DELETE"},userType:"ADMIN"},(err, adminResult)=>{
        if (err) {
            console.log("Admin creation error",err)
        } else if (adminResult) {
            console.log('default admin exist,')
  }
 else {
            let admin ={
                name:"Hargovind",
                mobileNumber:"8009652104",
                address:"Uttar pradesh",
                email:"admin@gmail.com",
                password:bcrypt.hashSync("1000"),
                userType:"ADMIN"
            }
            userModel(admin).save((error, adminCreate)=>{
                if (error) {
                console.log("Admin creation error:",error)                    
                } else {
                    console.log('Default admin created')   
                }
            })
    }
})

    