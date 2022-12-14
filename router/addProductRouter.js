const express =require('express')
const router = express.Router();
const productController = require("../Controller/addProductController")
 /**
 * @swagger
 * /product/addProduct:
 *   post:
 *     tags:
 *       - ADD NEW PRODUCT
 *     description: addProduct
 *     produces:
 *       - application/json
 *     parameters: 
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: image
 *         description: image required.
 *         in: formData
 *         required: true
 *       - name: productName
 *         description: productName required.
 *         in: formData
 *         required: true
 *       - name: price
 *         description: price required.
 *         in: formData
 *         required: true
 *       - name: quntity
 *         description: quantity required.
 *         in: formData
 *         required: true
 *       - name: discount
 *         description: discount required.
 *         in: formData
 *         required: true
 *       - name: gst
 *         description: gst required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, product add successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/addProduct',productController.addProduct)
/**
 * @swagger
 * /product/productList:
 *   post:
 *     tags:
 *       - ADD NEW PRODUCT
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
 *         description: Thanks,  product list view successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/productList', productController.productList)
/**
 * @swagger
 * /product/editProductData:
 *   post:
 *     tags:
 *       - ADD NEW PRODUCT
 *     description: editProductData
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
 *       - name: productName
 *         description: productName required.
 *         in: formData
 *         required: true
 *       - name: price
 *         description: price required.
 *         in: formData
 *         required: true
 *       - name: quantity
 *         description: quantity required.
 *         in: formData
 *         required: true
 *       - name: discount
 *         description: discount required.
 *         in: formData
 *         required: true
 *       - name: gst
 *         description: gst required.
 *         in: formData
 *         required: true   
 *     responses:
 *       200:
 *         description: Thanks, product data edit  successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/editProductData',productController.editProductData)
/**
 * @swagger
 * /product/productDelete:
 *   post:
 *     tags:
 *       - ADD NEW PRODUCT
 *     description: productDelete
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
router.post('/productDelete', productController.productDelete) 
router.post('/searchAPI', productController.searchAPI) ;
module.exports=router;
