const express =require('express')
const router = express.Router();
const jobTypeController = require("../Controller/addjobTypeController")
 /**
 * @swagger
 * /jobType/jobAdd:
 *   post:
 *     tags:
 *       - JOB TYPE
 *     description: jobAdd
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: jobType
 *         description: jobType required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, job Type add successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/jobAdd',jobTypeController.jobAdd)
/**
 * @swagger
 * /jobType/editJobType:
 *   put:
 *     tags:
 *       - JOB TYPE
 *     description: editJobType
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
 *       - name: jobType
 *         description: jobType required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, job Type edit successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.put('/editJobType',jobTypeController.editJobType)
/**
 * @swagger
 * /jobType/jobTypeList:
 *   put:
 *     tags:
 *       - JOB TYPE
 *     description: jobTypeList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks,  jobType list view successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
 router.put('/jobTypeList',jobTypeController.jobTypeList)
/**
 * @swagger
 * /jobType/deleteJobType:
 *   delete:
 *     tags:
 *       - JOB TYPE
 *     description: deleteJobType
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
 *         description: Thanks, Data delete  successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
 router.delete('/deleteJobType',jobTypeController.deleteJobType)
module.exports=router;
