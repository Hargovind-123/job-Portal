const express =require('express')
const router = express.Router();
const jobController = require("../Controller/jobController")
 /**
 * @swagger
 * /Job/addJob:
 *   post:
 *     tags:
 *       - ADD NEW JOB
 *     description: addJob
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: category
 *         description: category required.
 *         in: formData
 *         required: true
 *       - name: jobType
 *         description: jobType required.
 *         in: formData
 *         required: true
 *       - name: company
 *         description: company required.
 *         in: formData
 *         required: true
 *       - name: jobLocation
 *         description: jobLocation required.
 *         in: formData
 *         required: true
 *       - name: jobTitle
 *         description: jobTitle required.
 *         in: formData
 *         required: true   
 *       - name: vacancy
 *         description: vacancy required.
 *         in: formData
 *         required: true
 *       - name: lastDate
 *         description: lastDate required.
 *         in: formData
 *         required: true
 *       - name: skillNeeded
 *         description: skillNeeded required.
 *         in: formData
 *         required: true
 *       - name: minWrokExperience
 *         description: minWorkExperience required.
 *         in: formData
 *         required: true
 *       - name: maxWorkExperience
 *         description: maxWorkExperience required.
 *         in: formData
 *         required: true
 *       - name: currency
 *         description: currency required.
 *         in: formData
 *         required: true
 *       - name: minAnnualCTC
 *         description: minAnnualCTC required.
 *         in: formData
 *         required: true
 *       - name: maxAnnualCTC
 *         description: maxAnnualCTC required.
 *         in: formData
 *         required: true
 *       - name: qualifcation
 *         description: qualification required.
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
router.post('/addJob',jobController.addJob)
/**
 * @swagger
 * /Job/jobList:
 *   put:
 *     tags:
 *       - ADD NEW JOB 
 *     description: jobList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks,  job list view successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.put('/jobList', jobController.jobList)
/**
 * @swagger
 * /Job/editJobData:
 *   put:
 *     tags:
 *       - ADD NEW JOB
 *     description: editJobData
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: category
 *         description: category required.
 *         in: formData
 *         required: true
 *       - name: jobType
 *         description: jobType required.
 *         in: formData
 *         required: true
 *       - name: company
 *         description: company required.
 *         in: formData
 *         required: true
 *       - name: jobLocation
 *         description: jobLocation required.
 *         in: formData
 *         required: true
 *       - name: jobTitle
 *         description: jobTitle required.
 *         in: formData
 *         required: true   
 *       - name: vacancy
 *         description: vacancy required.
 *         in: formData
 *         required: true
 *       - name: lastDate
 *         description: lastDate required.
 *         in: formData
 *         required: true
 *       - name: skillNeeded
 *         description: skillNeeded required.
 *         in: formData
 *         required: true
 *       - name: minWrokExperience
 *         description: minWorkExperience required.
 *         in: formData
 *         required: true
 *       - name: maxWorkExperience
 *         description: maxWorkExperience required.
 *         in: formData
 *         required: true
 *       - name: currency
 *         description: currency required.
 *         in: formData
 *         required: true
 *       - name: minAnnualCTC
 *         description: minAnnualCTC required.
 *         in: formData
 *         required: true
 *       - name: maxAnnualCTC
 *         description: maxAnnualCTC required.
 *         in: formData
 *         required: true
 *       - name: qualifcation
 *         description: qualification required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, job data edit  successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.put('/editJobData',jobController.editJobData)
/**
 * @swagger
 * /Job/jobDelete:
 *   delete:
 *     tags:
 *       - ADD NEW JOB 
 *     description: jobDelete
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
router.delete('/jobDelete', jobController.jobDelete)
module.exports=router;

