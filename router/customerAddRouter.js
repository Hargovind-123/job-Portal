const express =require('express')
const router = express.Router();
const customerController = require("../Controller/customerAddCustomer")
 /**
 * @swagger
 * /customer/addCustomer:
 *   post:
 *     tags:
 *       - ADD NEW CUSTOMER
 *     description: addCustomer
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
 *       - name: customerName
 *         description: customerName required.
 *         in: formData
 *         required: true
 *       - name: address
 *         description: address required.
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *       - name: contactNumber
 *         description: contactNumber required.
 *         in: formData
 *         required: true   
 *       - name: zipCode
 *         description:  zipCode required.
 *         in: formData
 *         required: true
 *       - name: city
 *         description: city required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, new customer add successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/addCustomer',customerController.addCustomer)
/**
 * @swagger
 * /customer/customerList:
 *   post:
 *     tags:
 *       - ADD NEW CUSTOMER
 *     description: customerList
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
router.post('/customerList', customerController.customerList)
/**
 * @swagger
 * /customer/editCustomerData:
 *   post:
 *     tags:
 *       - ADD NEW CUSTOMER
 *     description: editCustomerData
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
 *       - name: customerName
 *         description: customerName required.
 *         in: formData
 *         required: true
 *       - name: address
 *         description: address required.
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *       - name: countryCode 
 *         description: countryCode required.
 *         in: formData
 *         required: true
 *       - name: contactNumber
 *         description: contactNumber required.
 *         in: formData
 *         required: true   
 *       - name: zipCode
 *         description:  zipCode required.
 *         in: formData
 *         required: true
 *       - name: city
 *         description: city required.
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
router.post('/editCustomerData',customerController.editCustomerData)
/**
 * @swagger
 * /customer/customerDelete:
 *   post:
 *     tags:
 *       - ADD NEW CUSTOMER 
 *     description: customerDelete
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
router.post('/customerDelete', customerController.customerDelete)
/**
 * @swagger
 * /customer/customerBlock:
 *   post:
 *     tags:
 *       - ADD NEW CUSTOMER 
 *     description: customerBlock
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
 *         description: Thanks,  data block  successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
 router.post('/customerBlock', customerController.customerBlock)
module.exports=router;
