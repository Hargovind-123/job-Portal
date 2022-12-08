 const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserMangement = require('../Controller/userManagementController');
/**
 * @swagger
 * /userManagement/list:
 *   post:
 *     tags:
 *       - UserManagement
 *     description: list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, open list successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/list',UserMangement.list)
/**
 * @swagger
 * /userManagement/view:
 *   post:
 *     tags:
 *       - UserManagement
 *     description: view
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: _id required.
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, view successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/view',UserMangement.view)
/**
 * @swagger
 * /userManagement/block:
 *   post:
 *     tags:
 *       - UserManagement
 *     description: block
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
 *         description: Thanks, block successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/block',UserMangement.block)
/**
 * @swagger
 * /userManagement/delete:
 *   post:
 *     tags:
 *       - UserManagement
 *     description: delete
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
 *         description: Thanks, delete successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */  
router.post('/delete',UserMangement.delete)

module.exports = router;