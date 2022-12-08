const express =require('express')
const router = express.Router();
const adminController = require("../Controller/adminController")
/**
 * @swagger
 * /admin/login:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully login.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/login', adminController.login)
/**
 * @swagger
 * /admin/forgotPassword:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: forgotPassword
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, otp send your email id login.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
 router.post('/forgotPassword', adminController.forgotPassword)
 /**
 * @swagger
 * /admin/resendOtp:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: resendOtp
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, otp send your email id .
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
  router.post('/resendOtp', adminController.resendOtp)
 /**
 * @swagger
 * /admin/changePassword:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: changePassword
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: password
 *         description: password required.
 *         in: formData
 *         required: true
 *       - name: newPassword
 *         description: newPassword required.
 *         in: formData
 *         required: true
 *       - name: confirm_password
 *         description: confirm_password required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, password changed successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/changePassword', adminController.changePassword)
/**
 * @swagger
 * /admin/editProfile:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: editProfile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true   
 *       - name: name
 *         description: name required.
 *         in: formData
 *         required: true 
 *       - name: address
 *         description: address required.
 *         in: formData
 *         required: true
 *       - name: dob
 *         description: dob required.
 *         in: formData
 *         required: true 
 *       - name: mobileNumber
 *         description: mobileNumber required.
 *         in: formData
 *         required: true  
 *     responses:
 *       200:
 *         description: Thanks, profile edit successfully .
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
 router.post('/editProfile', adminController.editProfile)
 /**
 * @swagger
 * /admin/userList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: userList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks,  user list view successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/userList',adminController.userList)
 module.exports=router;

