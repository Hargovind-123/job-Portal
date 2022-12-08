const express = require('express')
const auth= require("../middleware/auth")
const userController = require('../Controller/userController');
const router = express.Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags:
 *       - USER
 *     description: signup
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *       - name:  name
 *         description: name required.
 *         in: formData
 *         required: true
 *       - name: address
 *         description: address required.
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password required.
 *         in: formData
 *         required: true
 *       - name: confirm_password
 *         description: confirm_password required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully signup.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
  router.post('/signup',userController.signup);
 /**
  * @swagger
  * /user/verifyOtp:
  *   post:
  *     tags:
  *       - USER
  *     description: verifyOtp
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: otp
  *         description: otp required.
  *         in: formData
  *         required: true
  *     responses:
  *       200:
  *         description: Thanks, You have successfully verifyOtp.
  *       500:
  *         description: Internal Server Error
  *       501:
  *         description: Something went wrong!
  */  
  router.post('/verifyotp',userController.verifyOtp);
 /**
  * @swagger
  * /user/resendOtp:
  *   post:
  *     tags:
  *       - USER
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
  *         description: Thanks, You have successfully resendotp.
  *       500:
  *         description: Internal Server Error
  *       501:
  *         description: Something went wrong!
  */  
  router.post('/resendOtp',userController.resendOtp);
  /**
   * @swagger
   * /user/forgotPassword:
   *   post:
   *     tags:
   *       - USER
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
   *         description: Thanks, You have successfully forgotPassword.
   *       500:
   *         description: Internal Server Error
   *       501:
   *         description: Something went wrong!
   */  
  router.post('/forgotPassword',userController.forgotPassword); 
/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - USER
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
 router.post('/login',userController.login);
  /**
   * @swagger
   * /user/resetPassword:
   *   post:
   *     tags:
   *       - USER
   *     description: resetPassword
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: email required.
   *         in: formData
   *         required: true
   *       - name: otp
   *         description: otp required.
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
   *         description: Thanks, You have successfully  resetPassword.
   *       500:
   *         description: Internal Server Error
   *       501:
   *         description: Something went wrong!
   */
  router.post('/resetPassword',userController.resetPassword);
  /**
   * 
   * @swagger
   * /user/editProfile:
   *   post:
   *     tags:
   *       - USER
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
   *       - name: address
   *         description: address required.
   *         in: formData
   *         required: true   
   *       - name: name
   *         description: name required.
   *         in: formData
   *         required: true 
   *       - name: mobilenumber
   *         description: mobileNumber required.
   *         in: formData
   *         required: true  
   *     responses:
   *       200:
   *         description: Thanks, You have successfully edit.
   *       500:
   *         description: Internal Server Error
   *       501:
   *         description: Something went wrong!
   */
  router.post('/editProfile',userController.editProfile);
  /**
   * @swagger
   * /user/viewProfile:
   *   post:
   *     tags:
   *       - USER
   *     description: viewProfile
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token required.
   *         in: header
   *         required: true
   *     responses:
   *       200:
   *         description: Thanks, You have successfully viewData.
   *       500:
   *         description: Internal Server Error
   *       501:
   *         description: Something went wrong!
   */  
  router.post('/viewProfile', userController.viewProfile);
  // /**
  // * @swagger
  // * /user/userLogout:
  // *   post:
  // *     tags:
  // *       - USER
  // *     description: userLogout
  // *     produces:
  // *       - application/json
  // *     parameters:
  // *       - name: email
  // *         description: email required.
  // *         in: formData
  // *         required: true
  // *     responses:
  // *       200:
  // *         description: Thanks, Logout successfully.
  // *       500:
  // *         description: Internal Server Error
  // *       501:
  // *         description: Something went wrong!
  // */  
  // router.post('/userLogout', userController.userLogout)
   module.exports = router;
