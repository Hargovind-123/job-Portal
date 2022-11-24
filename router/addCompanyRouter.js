const express =require('express')
const router = express.Router();
const companyController = require("../Controller/addCompanyController")
 /**
 * @swagger
 * /company/addCompany:
 *   post:
 *     tags:
 *       - ADD NEW COMPANY
 *     description: addJob
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: companyName
 *         description: companyName required.
 *         in: formData
 *         required: true
 *       - name: personName
 *         description: personName required.
 *         in: formData
 *         required: true
 *       - name: gstNumber
 *         description: gstNumber required.
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber required.
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true   
 *       - name: address
 *         description: address required.
 *         in: formData
 *         required: true
 *       - name: city
 *         description: city required.
 *         in: formData
 *         required: true
 *       - name: pinCode
 *         description: pinCode required.
 *         in: formData
 *         required: true
 *       - name: website
 *         description: website required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, new plan add successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/addCompany',companyController.addCompany)
/**
 * @swagger
 * /company/companyList:
 *   put:
 *     tags:
 *       - ADD NEW COMPANY 
 *     description: companyList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks,  company list view successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.put('/companyList', companyController.companyList)
/**
 * @swagger
 * /company/editCompanyData:
 *   put:
 *     tags:
 *       - ADD NEW COMPANY
 *     description: editCompanyData
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
 *       - name: companyName
 *         description: companyName required.
 *         in: formData
 *         required: true
 *       - name: personName
 *         description: personName required.
 *         in: formData
 *         required: true
 *       - name: gstNumber
 *         description: gstNumber required.
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber required.
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true   
 *       - name: address
 *         description: address required.
 *         in: formData
 *         required: true
 *       - name: city
 *         description: city required.
 *         in: formData
 *         required: true
 *       - name: pinCode
 *         description: pinCode required.
 *         in: formData
 *         required: true
 *       - name: website
 *         description: website required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, company data edit  successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.put('/editCompanyData',companyController.editCompanyData)
/**
 * @swagger
 * /company/companyDelete:
 *   delete:
 *     tags:
 *       - ADD NEW COMPANY 
 *     description: company
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
 *     responses:
 *       200:
 *         description: Thanks,  data delete  successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.delete('/companyDelete', companyController.companyDelete)
module.exports=router;
