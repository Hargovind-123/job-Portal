const express =require('express')
const router = express.Router();
const planController = require("../Controller/plansController")
 /**
 * @swagger
 * /Plan/addPlan:
 *   post:
 *     tags:
 *       - PLAN
 *     description: addPlan
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: planName
 *         description: planName required.
 *         in: formData
 *         required: true
 *       - name: currency
 *         description: currency required.
 *         in: formData
 *         required: true
 *       - name: price
 *         description: price required.
 *         in: formData
 *         required: true
 *       - name: description
 *         description: description required.
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
router.post('/addPlan',planController.addPlan)
/**
 * @swagger
 * /Plan/editPlan:
 *   put:
 *     tags:
 *       - PLAN
 *     description: editPlan
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
 *       - name: planName
 *         description: planName required.
 *         in: formData
 *         required: true
 *       - name: currency
 *         description: currency required.
 *         in: formData
 *         required: true
 *       - name: price
 *         description: price required.
 *         in: formData
 *         required: true
 *       - name: description
 *         description: description required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, plan edit successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.put('/editPlan',planController.editPlan)
/**
 * @swagger
 * /Plan/planList:
 *   put:
 *     tags:
 *       - PLAN
 *     description: planList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks,  Plan list view  successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
 router.put('/planList',planController.planList)
/**
 * @swagger
 * /Plan/deletePlan:
 *   delete:
 *     tags:
 *       - PLAN
 *     description: deletePlan
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
 *         description: Thanks, data delete  successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
 router.delete('/deletePlan',planController.deletePlan)
module.exports=router;
