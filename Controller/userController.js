const userModel = require("../model/userModel");
const CommonFunction = require('../Helper/commonFunction')
const bcrypt= require('bcryptjs');
require("dotenv").config();
const{genrateOtp} = require("../Helper/commonFunction")
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
            const { firstName, lastName,education,  skills, dob,image, email, password, confirm_password, mobileNumber} = req.body
            console.log("============================>17",req.body)
            let user = await userModel.findOne({ email:req.body.email, userType:"USER", status:"ACTIVE" });
          console.log("=========================>14",user);
			let otp = generateOtp()
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
                        console.log("==========>23",salt)              
                        const hashPassword = await bcrypt.hashSync(password)
                     console.log("===>39", hashPassword)
                         let Tittle = 'Otp Verification'
                        let body = `Your Otp is ${otp}`
                        await CommonFunction.sendMail(req.body.email, Tittle, body)
                      const doc = await userModel({ email:email})
                    //   let image = await CommonFunction.uploadImage1(req.body.image)
                        const doc1 = await userModel({
                        
                            firstName:firstName,
                            lastName:lastName,                          
                            education:education,
                            skills: skills,
                            dob:dob,
                            image:image,
                            email: email,
                            mobileNumber: mobileNumber,
                            expTime: Date.now() + otpTime,
                            password: hashPassword,
                            confirm_password: hashPassword,
                            otp:otp,

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
  
   vertfyOtp: async (req, res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email, status:"ACTIVE", userType:"USER"})
        if (!user) {
            return res.json({responseCode: responseCode.USER_NOT_FOUND, responseMesage: responseMesage.USER_NOT_FOUND})
        } else {
            if (req.body.otp == user.otp){
                let currentTime = Date.now();
                if (currentTime.otp==user.otp) {
                    let data = await userModel.findByIdAndUpdate({_id: user._id},{$set:{otpVerification: true}},{new:true})
               if (save) {
                return res.json({ responseCode:responseCode.SUCCESS, responseMesage: responseMesage.OTP_VERIFY, responseResult:data})
               } else {
                return res.json({responseCode: responseCode.OTP_EXPIRED, responseMessage: responseMesage.OTP_EXPIRED})
               }
                } else {
             return res.json({responseCode: responseCode.WRONG_OTP, responseMesage: responseMesage.WRONG_OTP})                 
                }
            }
            
        }
    } catch (error) {
        return res.json({ responseCode: responseCode.SOMETHING_WRONG, responseMesage:responseMesage.SOMETHING_WRONG})
    }
   },
  resendOtp: async (req, res)=>{
   try {
    const {email} = req.body;

    let user = await userModel.findOne({email: req.body.email, status:"ACTIVE", userType:"USER"})
    if(!user){
        return res.send({responseCode:responseCode.USER_NOT_FOUND, responseMesage: responseMesage.USER_NOT_FOUND, })
    }
    else{
        let ottp1 = genrateOtp();
        expTime = Date.noe()+otpTime;
        let subject =`otp for Resend `
        let text = `your resend otp is : ${ottp1}`
        await common.sendMailing(req.body.email, subject, text)

      var resotp = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { expTime: expTime, otp: ottp2 } }, { new: true })
            if (resotp) {
                return res.send({ responseCode: responseCodes.SUCCESS, responseMessage: responseMessage.RESEND_OTP, responseResult: ottp2 })
            }
    }
   } catch (error) {
    return res.json({ responseCode: responseCode.SOMETHING_WRONG, responseMesage:responseMesage.SOMETHING_WRONG})

   }
   
},
forgotPassword: async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email: email, status: "ACTIVE", usertype: "USER" })
        if (!user) {
            return res.send({ responseCode: responseCodes.USER_NOT_FOUND, responseMessage: responseMessage.USER_NOT_FOUND })
        }
        else {
            let ottp3 = genrateOtp();
            expTime = Date.now() + 3 * 60 * 1000;
            subject = `otp for resend`
            let verificationURL = `http://localhost:30000/api/verifyEmail?userId=${user.email}&OTP=${ottp3}`;
            let text = `Your forget password otp ${ottp3} or you can berify with this URL: ${verificationURL}`;
            console.log('129 ==>', text)
            await common.sendMailing(req.body.email, subject, text)
            var forpass = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { emailVerify: false, otpVerification: false, expTime: expTime, otp: ottp3 } }, { new: true })
            var otp = ottp3
        }
        res.send({ responseCode: responseCodes.SUCCESS, responseMessage: responseMessage.FORGOT_PASSWORD, responseResult: forpass })
    }
    catch (error) {
        return res.send({ responseCode: responseCodes, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: error })
    }
},
resetPassword: async (req, res, next) => {
    try {

        const { email, newPassword, confirmPassword, otp } = req.body
        const user = await userModel.findOne({ email: email, status: "ACTIVE", userType: "USER" })
        if (!user) {
            return res.send({ responseCode: responseCodes.USER_NOT_FOUND, responseMessage: responseMessage.USER_NOT_FOUND })
        }
        else {
            const currentTime = Date.now();
            if (user.otp == otp) {
                const expTime = user.expTime
                if (currentTime <= expTime) {
                    if (newPassword === confirmPassword) {
                        const hashnewPassword = await bcryptjs.hashSync(newPassword)
                        let userUpdate = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { password: hashnewPassword, otpVerification: true } }, { new: true })
                        return res.send({ responseCode: responseCodes.SUCCESS, responseMessage: responseMessage.RESET_PASSWORD, responseResult: [] })
                    }
                    else {
                        return res.send({ responseCode: responseCodes.PASSWORD_CONFIRMPASSWORD, responseMessage: responseMessage.PASSWORD_NOT_MATCH })
                    }
                }
                else {
                    return res.send({ responseCode: responseCodes.OTP_EXPIRED, responseMessage: responseMessage.OTP_EXPIRED })
                }
            }
            else {
                return res.send({ responseCode: responseCodes.WRONG_OTP, responseMessage: responseMessage.WRONG_OTP })
            }
        }
    }
    catch (error) {
        return res.send({ responseCode: responseCodes.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: error.message })
    }
},
login: async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {
            const user = await userModel.findOne({email:req.body.email, status: "ACTIVE", usertype: "USER" })
            console.log(user);
            if (user) {
     const isMatch = await bcryptjs.compareSync(password, user.password)
                console.log("==--173,userlog", isMatch);
                if (isMatch == true) {
                    if (!user.otpVerification == true) {
                        return res.send({ responseCode: responseCode.PASSWORD_CONFIRMPASSWORD, responseMessage: responseMessage.OTP_NOT_VERIFY })
                    }
                    const token = jwt.sign({ userId: user._id },
                        "Hello", { expiresIn: "1d" })
                    return res.send({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.LOG_IN, responseResult: user, token: token })
                }
                else {
                    return res.send({ responseCode: responseCode.PASSWORD_CONFIRMPASSWORD, responseMessage: responseMessage.PASSWORD_INVALID, responseResult: [] })
                }
            }
            else {
                return res.send({ responseCode: responseCode.PASSWORD_CONFIRMPASSWORD, responseMessage: responseMessage.UNABLE_LOGIN, responseResult: user })
            }
        } else {
            return res.send({ responseCode: responseCode.BOTH_FIELDS_REQUIRED, responseMessage: responseMessage.BOTH_FIELDS_REQUIRED })
        }
    }
    catch (error) {
        return res.send({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: error.message })
    }

},

changePassword: async (req, res, next) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body
        // console.log(oldPassword,newPassword,confirmPassword)
        const user = await userModel.findOne({ _id: req.userId._id, status: "ACTIVE", usertype: "USER" })
        // console.log("===", user)
        if (!user) {
            return res.send({ responseCode: responseCodes.USER_NOT_FOUND, responseMessage: responseMessage.USER_NOT_FOUND })
        }

        else {
            if (newPassword && confirmPassword) {
                const isMatch = await bcryptjs.compareSync(oldPassword, user.password)
                if (newPassword == confirmPassword && user.otpVerification) {
                    const hashnewPassword = await bcryptjs.hashSync(newPassword)

                    let userSaave = await userModel.findOneAndUpdate({ _id: user._id }, { $set: { password: hashnewPassword } }, { new: true })
                    return res.send({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.CHANGE_PASSWORD, responseResult: [] })
                }
                else {
                    return res.send({ responseCode: responseCode.PASSWORD_CONFIRMPASSWORD, responseMessage: responseMessage.PASSWORD_NOT_MATCH })
                }
            }
            else {
                return res.send({ responseCode: responseCode.BOTH_FIELDS_REQUIRED, responseMessage: responseMessage.BOTH_FIELDS_REQUIRED })
            }
        }
    }
    catch (error) {
        return res.send({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: error.message });
    }
},
editProfile: async (req, res, next) => {

    try {

        const { firstName, lastName, userName, skills, education,  mobileNumber, address, countryCode, dob, email } = req.body
        console.log(email);
        const user = await userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" })
        if (!user) {
            return res.send({ responseCode: responseCode.USER_NOT_FOUND, responseMessage: responseMessage.USER_NOT_FOUND, responseResult: [] })
        }
        else {
            const mobile = await userModel.findOne({ mobileNumber: mobileNumber }, { $ne: "DELETE" })
            if (mobile) {
                return res.send({ responseCode: responseCode.ALREADY_EXIST, responseMessage: responseMessage.NO_ALREDY_EXIST, responseResult: [] })
            }
            const mail = await userModel.findOne({ email: email }, { $ne: "DELETE" })
            if (mail) {
                return res.send({ responseCode: responseCode.ALREADY_EXIST, responseMessage: responseMessage.MAIL_ALREADY_EXIST })
            }
            let image 
            let userProfileUpdate = await userModel.findByIdAndUpdate({ _id: user._id }, {
                $set:
                {
                    firstName: firstName,
                    lastName: lastName,
                    skills: skills,
                    userName: userName,
                    education: education,
                    mobileNumber: mobileNumber,
                    address: address,
                    countryCode: countryCode,
                    dob : dob,
                    email: email,
                }
            }, { new: true })

            return res.send({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.EDIT_PROFILE, responseResult: userProfileUpdate })
        }
    }
    catch (error) {
        return res.send({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: error.message })
    }
},

viewProfile: async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.userId, status: "ACTIVE", usertype: "USER" })
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
    // End Module Exports //
},
verifyEmail: async (req, res) => {
    try {
        const user = await userModel.findOne({ $or: [{ email: req.query.userId }], userType: "USER" })
        if (!user) {
            return res.json({ responseCode: 404, responseMessage: "user not found" })
        }
        else {
            if (req.query.OTP == user.otp) {
                let currentTime = Date.now();
                if (currentTime <= user.expTime) {
                    let verifyUser = await userModel.findByIdAndUpdate(user._id, { emailVerify: true, otpVerification: true }, { new: true })
                    return res.json({ responseCode: 200, responseMessage: "Your email verified successfully.", responseResult: verifyUser })
                }
                else {
                    return res.send({ responseCode: responseCode.OTP_EXPIRED, responseMessage: responseMessage.OTP_EXPIRED, responseResult: [] })
                }
            }
            else {
                return res.send({ responseCode: responseCode.WRONG_OTP, responseMessage: responseMessage.WRONG_OTP })
            }

        }
    }
    catch (error) {
        console.log(error)
        return res.json({ responseCode: 501, responseMessage: "Something went wrong!", responseResult: error })
    }
},

}
 
function generateOtp() {
    let otp = Math.floor(100000 + Math.random() * 900000)
    console.log(`Your Otp ===> ${otp}`)
    return otp
}

