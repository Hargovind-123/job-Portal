const express = require('express');
const userModel = require('../model/userModel')
const { query } = require('express');
const productModel = require("../model/addProduct")
const responseCode = require('../responseCode')
const responseMessage = require('../responseMessage')
const status = require("../enums/status")
const userType = require('../enums/userType')
module.exports = {
	addProduct: async (req, res) => {
		try {
			const{productName, price, quantity, discount, gst} = req.body
			 console.log("===================================>13", req.body)
			const addData = await userModel.findOne({ userType: "ADMIN" })
			console.log("================================================>15", addData)
			if (!addData) {
				return res.json({ responseCode: responseCode.DATA_NOT_FOUND, responseMessage: responseMessage.DATA_NOT_FOUND})	
				} else {
					let productData = {
						productName: productName,
                        price: price,
                        quantity:quantity,
                        discount: discount,
                        gst:gst
					}

					const productSave = await productModel(productData).save()
                    console.log("=======================================>35",productSave)
					
					return res.json({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.COMPANY_ADD, responseResult:productSave })
				}
			

		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG })
		}
	},
	productList: async (req, res) => {
		try {
			const list = await productModel.find({ userType: "ADMIN" })
			if (!list) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				return res.json({ responseCode: 200, responsemessage: responseMessage.LIST, responseResult: list })
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	editProductData: async (req, res) => {
		try {
			const{productName, price, quantity, discount, gst} = req.body
			const editData = await productModel.findOne({ userType: "ADMIN", })
			if (!editData) {
				return res.json({ responseCode: responseMessage.USER_NOT_FOUND, responseMessage: responseMessage.DATA_NOT_FOUND })

			} else {
				let dataEdit = await productModel.findByIdAndUpdate({ _id: editData._id }, { $set: {productName: req.body.productName, price: req.body.price, quantity: req.body.quantity, discount: req.body.discount, gst: req.body.gst}})
				if (dataEdit) {
					return res.json({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.DATA_EDIT, responseResult: dataEdit });
				}
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG })
		}
	},
	productDelete: async (req, res) => {
		try {
			const deleteData = await productModel.findOne({ _id: req.query._id, userType:"ADMIN" })

			if (!deleteData) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })


			} else {
				const data = await productModel.findByIdAndDelete({ _id: deleteData._id })
				return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.DELETE, responseResult: data })
			}
		} catch (error) {
			res.send({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
}
