const userModel = require("../model/userModel");
const CommonFunction = require('../Helper/commonFunction')
const bcrypt= require('bcryptjs');
require("dotenv").config();
let otpTime = 5 * 60 * 1000;
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
const cloudinary = require('cloudinary')
const responseCode = require("../responseCode")
const responseMessage = require("../responseMessage")
const status = require("../enums/status")
const userType = require("../enums/userType")
module.exports = {
    signup: async (req, res) => {
        try {
            const { name, email, address,password, confirm_password, mobileNumber} = req.body 
            let user = await userModel.findOne({ email:req.body.email, userType:"USER", status:"ACTIVE" });
          let otp = generateOtp();
            if (user) {
                return res.json({ responseCode:responseCode.ALREADY_EXIST, responseMessage:responseMessage.USER_ALREADY});
            }
            else {
                if (password !== confirm_password) {
                    return res.json({ responseCode: responseCode.PASSWORD_CONFIRMPASSWORD, responseMesage: responseMessage.PASSWORD_NOT_MATCH});
                }
                else {
                    
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hashSync(password)                
                      let Tittle = 'Otp Verification'
                      let body = `Your Otp is ${otp}`
                      await CommonFunction.sendMail(req.body.email, Tittle, body, )
                      const doc = await userModel({ email:email})
                        const doc1 = await userModel({          
                            name:name,
                            email: email,
                            address: address,
                            mobileNumber: mobileNumber,
                            password: hashPassword,
                            confirm_password: hashPassword,
                            otp:otp,
                            expTime: Date.now()+otpTime
                        }).save();               
                        var oldPassword = hashPassword
                        const userSave = await userModel(doc1).save()                       
                        return res.send({ responseCode:responseCode.SUCCESS, responseMesage:responseMessage.SIGN_UP, responseResult:userSave });
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
           const userSave = await userModel.findOne({ email: email });
                if (userSave) {
                    return res.send({ responseCode:responseCode.SUCCESS, responseMesage:responseMessage.SIGN_UP, responseResult: userSave });
                }
            }
        }
        catch (error) {
            res.send({ responseCode:responseCode.SOMETHING_WRONG, responseMesage:responseMessage.SOMETHING_WRONG })
        }   
	},
   verifyOtp:  async (req, res) => {
    try {
        let user = await userModel.findOne({ otp: req.body.otp, userType:"USER", status:"ACTIVE"})
        if (!user) {
            res.send({ responseCode: 401, responseMesage: " data not found", responseResult:[] })
        } else {
         if (user.otpvarification == true) {
               res.send({ responseCode: responseCode.VERIFIED, responseMessage: responseMessage.VERIFIED, })
            } else {
                console.log(req.body.otTp);
                console.log(user.otp);

                if (req.body.otp == user.otp) {
                   
                    let currentTime = Date.now();
                    if (currentTime <= user.expTime) {
                        let save = await userModel.findByIdAndUpdate(
                            { _id: user._id },
                            { $set: { otpvarification: true } },
                            { new: true }
                        );
                        if (save) {
                            res.send({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.OTP_VERIFY, responsResult: save })
                        }
                    } else {
                        res.send({ responseCode: responseCode.OTP_EXPIRED, responseMessage: responseMessage.OTP_EXPIRED, responseResult: [] });
                    }

                } else {
                    res.send({ responseCode: responseCode.WRONG_OTP, responseMessage:responseMessage.WRONG_OTP, responseResult: [] });
                }
            }
        }

    } catch (error) {
        console.log(error)
        res.send({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: [] })
    }

},
  resendOtp: async (req, res)=>{
   try {
       let user = await userModel.findOne({email: req.body.email})
    if(!user){
        return res.send({responseCode:responseCode.USER_NOT_FOUND, responseMessage: responseMessage.USER_NOT_FOUND, })
    }
    else{
        let ottp = generateOtp();
        expTime = Date.now() + otpTime;
        let subject = `Otp for Resend`
        let text = `your resend otp is :${ottp}`
        await CommonFunction.sendMail(req.body.email, subject, text)
      const  resend = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { expTime: expTime, otp: ottp } }, { new: true })
   
      if (resend) {
                return res.send({ responseCode:responseCode.SUCCESS, responseMessage: responseMessage.RESEND_OTP, responseResult: ottp })
            }       
}
   } catch (error) {
    return res.json({ responseCode: responseCode.SOMETHING_WRONG, responseMessage:responseMessage.SOMETHING_WRONG})
   }   
},
forgotPassword: async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email: email, status: "ACTIVE", usertype: "USER" })
        if (!user) {
            return res.send({ responseCode: responseCode.USER_NOT_FOUND, responseMessage: responseMessage.USER_NOT_FOUND })
        }
        else {
            let ottp3 = generateOtp();
            expTime = Date.now() + otpTime;
            subject = `otp for resend`
            let text = `Your forget password otp ${ottp3}`;
            await CommonFunction.sendMail(req.body.email, subject, text)
            const  forpass = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: {  expTime: expTime, otp: ottp3} }, { new: true })
            if(forpass){
            res.send({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.FORGOT_PASSWORD, responseResult: ottp3 })
        }
        
    }
}
    catch (error) {
        return res.send({ responseCode: responseCode, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: error })
    }
},
resetPassword: async (req, res, next) => {
    try {

        const { email, newPassword, confirm_password, otp } = req.body
        const user = await userModel.findOne({ email: email, status: "ACTIVE", userType: "USER" })
        if (!user) {
            return res.send({ responseCode: responseCode.USER_NOT_FOUND, responseMessage: responseMessage.USER_NOT_FOUND })
        }
        else {
            const currentTime = Date.now();
            if (user.otp == otp) {
                const expTime = user.expTime
                if (currentTime <= expTime) {
                    if (newPassword === confirm_password) {
                        const hashnewPassword = await bcryptjs.hashSync(newPassword)
                        let userUpdate = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { password: hashnewPassword, otpVerification: true } }, { new: true })
                        return res.send({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.RESET_PASSWORD, responseResult: userUpdate })
                    }
                    else {
                        return res.send({ responseCode: responseCode.PASSWORD_CONFIRMPASSWORD, responseMessage: responseMessage.PASSWORD_NOT_MATCH })
                    }
                }
                else {
                    return res.send({ responseCode: responseCode.OTP_EXPIRED, responseMessage: responseMessage.OTP_EXPIRED })
                }
            }
            else {
                return res.send({ responseCode: responseCode.WRONG_OTP, responseMessage: responseMessage.WRONG_OTP })
            }
        }
    }
    catch (error) {
        return res.send({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: error.message })
    }
},
login:async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {

            const user = await userModel.findOne({ email: email})

            if (user) {
                const isMatch = await bcrypt.compareSync(password, user.password )
                if (email === user.email && isMatch) {
                    const token = await jwt.sign({ userId: user._id, email: email }, "Mobiloitte", { expiresIn: "1d" })
                   return res.send({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.LOG_IN, responsResult: user, token: token })
                } else {
                    return res.send({ responseCode: responseCode.EMAIL_PASSWORD, responseMessage: responseMessage.EMAIL_PASSWORD })
                }
            } else {
                return res.send({ responseCode: responseCode.USER_NOT_FOUND,responseMessage: responseMessage.DATA_NOT_FOUND })
            }

        } else {
            return  res.send({ responseCode: responseCode.BOTH_FIELDS_REQUIRED, responseMessage: responseMessage.BOTH_FIELDS_REQUIRED })

        }

    } catch (error) {
        return res.send({responseCode:responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG})
    }
},
editProfile: async (req,res)=>{
    try {
       const{email, name, mobileNumber, address,}=req.body
       
       const user=await userModel.findOne({ userType:"USER", status:"ACTIVE"})
       
       if (!user) {
        res.send({responseCode: responseCode.USER_NOT_FOUND, responseMessage: responseMessage.USER_NOT_FOUND})        
       } 

   else {
    const mail = await userModel.find({email:req.body.email})
    if(mail==user.email){
        return res.send({responseCode: responseCode.ALREADY_EXIST,responseMessage:responseMessage.ALREDY_EXIST})
    }else{
        const number=await userModel.find({number:req.body.number})
        if(number==user.number){
            return res.send({responseCode: responseCode.ALREADY_EXIST, responseMesage: responseMessage.NUMBER_ALREDY_EXIST})
        }else{
            let userProfileUpdate=await userModel.findByIdAndUpdate({_id:user._id},{email:email, name:name, address:address,mobileNumber:mobileNumber},{new:true})
            res.send({responseCode: responseCode.SUCCESS,responseMesage: responseMessage.EDIT_PROFILE,responseResult:userProfileUpdate})    
        }
    }          
      }
    } catch (error) {
       res.send({responseCode:501,responseMesage:"something went wrong",responseResult:error})
    }
   },

viewProfile: async (req, res) => {
    try {
        const user = await userModel.findOne({  status: "ACTIVE", userType: "USER" })
        if (!user) {
            return res.send({ responseCode: responseCode.USER_NOT_FOUND, responseMessage: responseMessage.USER_NOT_FOUND, responseResult: [] })
        }
        else {
            return res.send({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.VIEW, responseResult: user })
        }
    }
    catch (error) {
        return res.send({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: error.message })
    }
},

}
    
function generateOtp() {
    let otp = Math.floor(1000 + Math.random() * 9000)
    console.log(`Your Otp ===> ${otp}`)
    return otp
}

