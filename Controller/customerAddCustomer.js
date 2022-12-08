const express = require('express');
const userModel = require('../model/userModel')
const { query } = require('express');
const customerModel = require("../model/customerAddModel")
const responseCode = require('../responseCode')
const responseMessage = require('../responseMessage')
const status = require("../enums/status")
const userType = require('../enums/userType')
module.exports = {
	addCustomer: async (req, res) => {
		try {
			const{customerName, companyName, address, email, zipCode, city, country, contactNumber} = req.body
			const addData = await userModel.findOne({ userType: "ADMIN" })
			if (!addData) {
				return res.json({ responseCode: responseCode.DATA_NOT_FOUND, responseMessage: responseMessage.DATA_NOT_FOUND})	
				} else {
					let customerData = {
					customerName: customerName,
                    companyName: companyName,
                    address: address,
                    email:email,
                    zipCode: zipCode,
                    city: city,
                    country: country,
                    contactNumber: contactNumber,
					}
					const customerSave = await customerModel(customerData).save()  
					return res.json({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.CUSTOMER_ADD, responseResult: customerSave })
				}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG })
		}
	},
	customerList: async (req, res) => {
		try {
			const list = await customerModel.find({ userType: "ADMIN" })
			if (!list) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				return res.json({ responseCode: 200, responsemessage: responseMessage.LIST, responseResult: list })
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	editCustomerData: async (req, res) => {
		try {
			const{customerName, companyName, address, email, zipCode, city, country, contactNumber} = req.body
			const editData = await productModel.findOne({ userType: "ADMIN", })
			if (!editData) {
				return res.json({ responseCode: responseMessage.USER_NOT_FOUND, responseMessage: responseMessage.DATA_NOT_FOUND })

			} else {
				let dataEdit = await productModel.findByIdAndUpdate({ _id: editData._id }, { $set: {customerName: req.body.customerName, companyName:req.body.companyName, address:req.body,address, email: req.body.email, city: req.body.city, zipCode: req.body.zipCode, contactNumber: req.body.contactNumber, country: req.body.contactNumber}})
				if (dataEdit) {
					return res.json({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.DATA_EDIT, responseResult: dataEdit });
				}
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG })
		}
	},
	customerDelete: async (req, res) => {
		try {
			const deleteData = await customerModel.findOne({ _id: req.query._id, userType:"ADMIN" })

			if (!deleteData) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })


			} else {
				const data = await customerModel.findByIdAndDelete({ _id: deleteData._id })
				return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.DELETE, responseResult: data })
			}
		} catch (error) {
			res.send({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
    customerBlock: async (req, res) => {
		try {
			const blockData = await customerModel.findOne({ _id: req.query._id, userType:"ADMIN" })

			if (!blockData) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })
			} else {
				const data = await customerModel.findByIdAndBlock({ _id: blockData._id })
				return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.CUSTOMER_BLOCK, responseResult: data })
			}
		} catch (error) {
			res.send({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
}