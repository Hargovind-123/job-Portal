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
 *       - name:  firstName
 *         description: firstName required.
 *         in: formData
 *         required: true
 *       - name: lastName
 *         description: lastName required.
 *         in: formData
 *         required: true
 *       - name: education
 *         description: education required.
 *         in: formData
 *         required: true
 *       - name: skills
 *         description: skills required.
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
 *       - name: image
 *         description: image required.
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

router.post('/login',userController.login)
module.exports=router;
