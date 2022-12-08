const router=require('express').Router()
const  staticController = require('../Controller/staticController')
/**
 * @swagger
 * /admin/view:
 *   post:
 *     tags:
 *       - Static
 *     description: Static View
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: _id required.
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Static View.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.post('/view',staticController.view)
/**
 * @swagger
 * /admin/list:
 *   post:
 *     tags:
 *       - Static
 *     description: Static list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Static list.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.post("/list",staticController.list)
/**
 * @swagger
 * /admin/add:
 *   post:
 *     tags:
 *       - Static
 *     description: Static Add
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: _id required.
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Static add.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.post("/add",staticController.add)
module.exports=router;