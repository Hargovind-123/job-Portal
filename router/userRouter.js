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
  *   put:
  *     tags:
  *       - USER
  *     description: verifyOtp
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
  *     responses:
  *       200:
  *         description: Thanks, You have successfully verifyOtp.
  *       500:
  *         description: Internal Server Error
  *       501:
  *         description: Something went wrong!
  */  
  router.put('/verifyotp',userController.verifyOtp);
 /**
  * @swagger
  * /user/resendOtp:
  *   put:
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
  router.put('/resendOtp',userController.resendOtp);
  /**
   * @swagger
   * /user/forgotPassword:
   *   put:
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
  router.put('/forgotPassword',userController.forgotPassword);
  
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
   *   put:
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
  router.put('/resetPassword',userController.resetPassword);


  /**
   * 
   * @swagger
   * /user/editProfile:
   *   put:
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
   *       - name: _id
   *         description: _id required.
   *         in: query
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
  router.put('/editProfile',userController.editProfile)
  /**
   * @swagger
   * /user/viewProfile:
   *   get:
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
  router.get('/viewProfile', userController.viewProfile)
module.exports = router;
