const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/JobPortal",(err,res) =>{

    if(err){
        console.log("database not connected")
    }
    else{
        console.log("database connected");
    }

})
