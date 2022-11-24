const { response } = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/eyeMatic",
{
    useNewUrlParser: true,
  
    useUnifiedTopology: true,
}, (err)=>{
    if(err){
        console.log("database not connected")
    }
    else{
        console.log('database connected succesfully')
   }
}
)
