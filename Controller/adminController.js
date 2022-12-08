const express = require('express')
const userModel = require("../model/userModel")
const bcrypt = require('bcryptjs')
const CommonFunction = require('../Helper/commonFunction');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const responseMesage = require('../responseMessage')
const responseCode = require("../responseCode")
const status = require('../enums/status')
const userType = require('../enums/status');
const { response } = require('express');
let otpTime = 4 * 60 * 1000
module.exports = {
	login: async (req, res) => {
        
        try {
            const { email, password } = req.body
            if (email && password) {
             const admin = await userModel.findOne({userType:"ADMIN"})                             
                if (admin) {
                    const isMatch = await bcrypt.hashSync(password, admin.password)
                    if (admin.password==isMatch) {
                        const token = await jwt.sign({ adminId:admin._id, email: email }, "Mobiloitte", { expiresIn: "1d" })
            
                        res.send({ responseCode: responseCode.SUCCESS, responseMessage: responseMesage.ADMIN_LOG_IN, responseResult:admin, token:token})
                
                    } else {
                        res.send({ responseCode: responseCode.EMAIL_PASSWORD, responseMessage: responseMesage.EMAIL_PASSWORD, })
                    }
                } else {
                    res.send({ responseCode: responseCode.ADMIN_NOT_FOUND, responseMessage: responseMesage.ADMIN_NOT_FOUND })
                }

            } else {
                res.send({ responseCode: responseCode.BOTH_FIELDS_REQUIRED, responseMessage: responseMesage.BOTH_FIELDS_REQUIRED})

            }

        } catch (error) {
            console.log(error)
        }
    },
	forgotPassword: async (req, res) => {
		try {
			const adminData = await userModel.findOne({  userType: "ADMIN" })
			if (!adminData) {
				res.send({ responseCode: responseCode.USER_NOT_FOUND, responseMessage: responseMesage.ADMIN_NOT_FOUND })
			} else {
				let otp2 = generateOtp();

				expTime = Date.now() + otpTime
				let subject = `otp for Forget`;
				let text = `your OTP is :${otp2}`
				await CommonFunction.sendMail(req.body.email, subject, text)
				if (adminData) {
					let Data = await userModel.findByIdAndUpdate({ _id: adminData._id }, { $set: { expTime: expTime, otp: otp2 } }, { new: true })
					if (Data) {
						return res.json({ responseCode: responseCode.SUCCESS, responseMessage: responseMesage.FORGOT_PASSWORD, responseResult: Data })

					} else {
						return res.json({ responseCode: responseCode.USER_NOT_FOUND, responseMessage: responseMesage.ADMIN_NOT_FOUND })

					}
				} else {
					return res.json({ responseCode: responseCode.INTERNAL_ERROR, responseMessage: responseMesage.ADMIN_NOT_FOUND })
				}

			}
		} catch (error) {
			res.send({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMesage.SOMETHING_WRONG })

		}
	},
	resendOtp: async (req, res) => {
        try {
            let admin = await userModel.findOne({ status:"ACTIVE",userType:"ADMIN" })
            console.log("==========>",admin)
            if (!admin) {
                res.send({ responseCode: responseCode.ADMIN_NOT_FOUND, responseMessage: responseMesage.ADMIN_NOT_FOUND })
            } else {
                let otp1 = generateOtp();
                expTime = Date.now() + otpTime ;
                let subject = 'Otp for resend';
                let text = `your Otp Is:${otp1}`;
                await CommonFunction.sendMail(req.body.email, subject, text)
                if (admin) {
                    let adminSave = await userModel.findByIdAndUpdate({ _id: admin._id }, { $set: { expTime: expTime, otp: otp1 } }, { new: true });
                    if (adminSave) {
                        res.send({ responseCode: responseCode.SUCCESS, responseMessage: responseMesage.RESEND_OTP , responseResult: adminSave })
                    }
                }
    
            }  
        } catch (error) {
            console.log(error)
            res.send({ responseCode: responseCode.SOMETHING_WRONG, responsMessage: responseMesage.SOMETHING_WRONG })
        }
    },
	resetPassword: async (req, res) => {
		try {
			const { email, otp, newPassword, confirm_password } = req.body
			const admin = await userModel.findOne({ email: email, userType: "ADMIN" })
			if (!admin) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responseMesage: responseMesage.ADMIN_NOT_FOUND })
			} else {
				const salt = await bcrypt.genSalt(10)
				const hashnewPassword = await bcrypt.hash(newPassword, salt)
				const currentTime = Date.now();
				if (admin.otp === otp) {
					const expTime = admin.expTime
					if (currentTime <= expTime) {
						if (newPassword === confirm_password) {
							let adminUpdate = await userModel.findByIdAndUpdate({ _id: admin._id }, { $set: { password: hashnewPassword, otpvarification: true } }, { new: true })
							return res.json({ responseCode: responseCode.SUCCESS, responseMessage: responseMesage.RESET_PASSWORD, responseResult: adminUpdate })
						} else {
							return res.json({ responseCode: responseCode.OTP_EXPIRED, responseMessage: responseMesage.OTP_EXPIRED })

						}

					} else {
						return res.json({ responseCode: responseCode.PASSWORD_CONFIRMPASSWORD, responseMessage: responseMesage.PASSWORD_NOT_MATCH })
					}
				}
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responseMesage: responseMesage.SOMETHING_WRONG });
		}
	},

	changePassword: async (req, res) => {
		try {
			const { password, newPassword, confirm_password } = req.body
			const admin = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" })
			if (!admin) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responseMessage: responseMesage.ADMIN_NOT_FOUND })

			} else {
				if (newPassword && confirm_password) {
					if (!newPassword == confirm_password) {
						return res.json({ responseCode: responseCode.PASSWORD_CONFIRMPASSWORD, responseMessage: responseMesage.PASSWORD_NOT_MATCH })

					} else {
						const salt = await bcrypt.genSalt(10)
						const hashnewPassword = await bcrypt.hash(newPassword, salt);
						const adminUpdate = await userModel.findByIdAndUpdate({ _id: admin._id }, { $set: { password: hashnewPassword } }, { new: true })
						return res.json({ responseCode: responseCode.SUCCESS, responseMessage: responseMesage.RESET_PASSWORD, responseResult: adminUpdate })

					}
				} else {
					return res.json({ responseCode: responseCode.BOTH_FIELDS_REQUIRED, responseMessage: responseMesage.BOTH_FIELDS_REQUIRED, responseResult: [] })
				}
			}

		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMesage.SOMETHING_WRONG })

		}
	},
	editProfile: async (req, res) => {
		try {
			const { email, name, mobileNumber, dob, address, } = req.body
			const admin = await userModel.findOne({ userType: "ADMIN" })
			if (!admin) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responseMesage: responseMesage.ADMIN_NOT_FOUND })
			}

			else {
				const mail = await userModel.find({ email: req.body.email })
				if (mail === admin.email) {
					return res.json({ responseCode: responseCode.ALREADY_EXIST, responseMessage: responseMesage.ALREADY_EXIST })
				} else {
					const number = await userModel.find({ number: req.body.number })
					if (number === admin.number) {
						return res.json({ responseCode: responseCode.ALREADY_EXIST, responseMesage: responseMesage.NOUMBER_ALREDY_EXIST })
					} else {

					}
				}
				let adminProfileUpdate = await userModel.findByIdAndUpdate({ _id: admin._id }, { email: email, name: name, dob: dob, address: address, mobileNumber: mobileNumber }, { new: true })
				return res.json({ responseCode: responseCode.SUCCESS, responseMesage: responseMesage.EDIT_PROFILE, responseResult: adminProfileUpdate })

			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responseMesage: responseMesage.SOMETHING_WRONG })
		}
	},
	userList: async (req, res)=>{
       try {
		const list = await userModel.find({userType:"USER", status:"ACTIVE"})
		if(!list){
			res.send({responseCode:403, responseMessage:"data not found", })
		}else{
			res.send({ responseCode:200, responseMessage:"user List view successfully", responseResult:list})
		}
	   } catch (error) {
		 res.send({ responseCode: 501, responseMessage:"something went wrong", responseResult:[]})
	   }
	},
	

}
function generateOtp() {
	let otp = Math.floor(1000 + Math.random() * 9000)
	console.log(`Your Otp ===> ${otp}`)
	return otp
}
