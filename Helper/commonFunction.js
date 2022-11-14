const nodemailer = require('nodemailer')
const smtp = require('nodemailer-smtp-transport')
const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: 'dehwh9dly',
  api_key: '378167969232439',
  api_secret: '0RA-uzwFS3cEDXt5JJDRNe_w7_E'
})
module.exports = {   
  
  genrateOtp: () => {
    let random = Math.random()
    let otp = Math.floor(random * 100000) + 100000
    return otp
},
uploadImage1: async (img) => {
    let imageRes = await cloudinary.v2.uploader.upload(img);
    if (imageRes) {
        return imageRes.secure_url;
    }
    else {
        console.log("Image upload error")
    }
},


    sendMail:async(email,title,body)=>{

      console.log("===>",email,title,body)
      try {
        let transport = nodemailer.createTransport({
          host:'smtp.gmail.com',
          port:465,
          secure:true,
          auth:{
            user: "no-replymailer@mobiloitte.com",
            pass:"%FEy=9FF@",
          }
        });
        let mailResponse = await transport.sendMail({
          from:"no-replymailer@mobiloitte.com",
          to:email,
          subject:title,
          text:body, 
        });

        return mailResponse
        
      } catch (error){
        console.log("send Error====>",error)
      }
    }
  }
