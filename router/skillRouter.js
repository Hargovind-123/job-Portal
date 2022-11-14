const express =require('express')
const router = express.Router();
const skillController = require("../Controller/skillsController")
 /**
 * @swagger
 * /Skills/skillsAdd:
 *   post:
 *     tags:
 *       - SKILLS
 *     description: skillsAdd
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: skills
 *         description: skills required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, skill add successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/skillsAdd',skillController.skillsAdd)
/**
 * @swagger
 * /skills/editSkills:
 *   put:
 *     tags:
 *       - SKILLS
 *     description: editSkills
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
 *       - name: skills
 *         description: skills required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, skill data edit successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.put('/editSkills',skillController.editSkills)
/**
 * @swagger
 * /Skills/skillsList:
 *   put:
 *     tags:
 *       - SKILLS
 *     description: skillsList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, skill data list view successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
 router.put('/skillsList',skillController.skillsList)
/**
 * @swagger
 * /Skills/deleteSkills:
 *   delete:
 *     tags:
 *       - SKILLS
 *     description: deleteSkills
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
 *         description: Thanks, skill data delete successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
 router.delete('/deleteSkills',skillController.deleteSkills)
module.exports=router;
