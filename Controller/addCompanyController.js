const express = require('express');
const userModel = require('../model/userModel')
const { query } = require('express');
const companyModel = require('../model/addComanyModel');
const responseCode = require('../responseCode')
const responseMessage = require('../responseMessage')
const status = require("../enums/status")
const userType = require('../enums/userType')
module.exports = {
	addCompany: async (req, res) => {
		try {
			const{companyName, personName, gstNumber, mobileNumber, email, address, city, pinCode, website} = req.body
			const addData = await userModel.findOne({ userType: "ADMIN" })
			if (!addData) {
				return res.json({ responseCode: responseCode.DATA_NOT_FOUND, responseMessage: responseMessage.DATA_NOT_FOUND})
			} else {
				var companyD = await companyModel.findOne({ gstNumber: req.body.gstNumber, email: req.body.email, companyName: req.body.companyName})
				if (companyD) {
					return res.json({responseCode: responseCode.ALREADY_EXIST, responseMessage: responseMessage.ALREDY_EXIST})
				} else {
					let companyData = {
						companyName: companyName,
						personName: personName,
						gstNumber: gstNumber,
						mobileNumber: mobileNumber,
						email: email,
						gstNumber: gstNumber,
						address: address,
						city: city,
						pinCode: pinCode,
						website: website,
					}
					const companyAdd = await companyModel(companyData).save()
					return res.json({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.COMPANY_ADD, responseResult: companyAdd })
				}
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG })
		}
	},
	companyList: async (req, res) => {
		try {
			const list = await companyModel.find({ userType: "ADMIN" })
			if (!list) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				return res.json({ responseCode: 200, responsemessage: responseMessage.LIST, responseResult: list })
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	editCompanyData: async (req, res) => {
		try {
			const { companyName, personName, gstNumber, mobileNumber, email, address, city, pinCode, website} = req.body
			const editData = await companyModel.findOne({ userType: "ADMIN", })
			if (!editData) {
				return res.json({ responseCode: responseMessage.USER_NOT_FOUND, responseMessage: responseMessage.DATA_NOT_FOUND })

			} else {
				let dataEdit = await companyModel.findByIdAndUpdate({ _id: editData._id }, { $set: {companyName: req.body.companyName, personName:req.body.personName, gstNumber:req.body.gstNumber, mobileNumber: req.body.mobileNumber, email: req.body.email, address: req.body.address, city: req.body.city, pinCode: req.body.pinCode, website: req.body.website } })

				if (dataEdit) {
					return res.json({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.DATA_EDIT, responseResult: dataEdit });
				}
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG })
		}
	},
	companyDelete: async (req, res) => {
		try {
			const deleteData = await companyModel.findOne({ _id: req.query._id })

			if (!deleteData) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })


			} else {
				const data = await companyModel.findByIdAndDelete({ _id: deleteData._id })
				return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.DELETE, responseResult: data })
			}
		} catch (error) {
			res.send({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
}
