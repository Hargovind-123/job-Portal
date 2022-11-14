const express = require('express');
const userModel = require('../model/userModel')
const { query } = require('express');
const planModel = require('../model/planModel');
const responseCode = require('../responseCode')
const responseMessage = require('../responseMessage')
const status = require("../enums/status")
const userType = require('../enums/userType')
module.exports = {
	addPlan: async (req, res) => {
		try {
			const { planName, currency, price, description } = req.body

			const addData = await userModel.findOne({ userType: "ADMIN" })
			console.log("=================================>13", addData)
			if (!addData) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				var planData = await planModel.findOne({ planName: req.body.planName })
				if (planData) {
					return res.json({ responseCode: responseCode.ALREADY_EXIST, responsemessage: responseMessage.ALREDY_EXIST })

				} else {
					let data = {
						planName: planName,
						currency: currency,
						price: price,
						description: description
					}
					const planAdd = await planModel(data).save()
					return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.PLAN_ADD_SUCCESSFULLY, responseResult: planAdd })
				}
			}

		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},

	editPlan: async (req, res) => {
		try {
			const { planName, currency, price, description } = req.body
			const editData = await planModel.findOne({ _id: req.query._id, userType: "ADMIN", })
			if (!editData) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				let planEdit = await planModel.findByIdAndUpdate({ _id: editData._id }, { $set: { planName: req.body.planName, currency: req.body.currency, price: req.body.price, description: req.body.description } })
				if (planEdit) {
					return res.json({ responseCode: responseCode.DATA_EDIT, responsemessage: responseMessage.EDIT_PROFILE, responseResult: planEdit });

				}
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	planList: async (req, res) => {
		try {
			const list = await planModel.find({ userType: "ADMIN" })
			if (!list) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.LIST, responseResult: list })
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	deletePlan: async (req, res) => {
		try {
			const data = await planModel.findOne({ _id: req.query._id, userType: "ADMIN" })
			if (!data) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })


			} else {
				let DeleteData = await planModel.findByIdAndDelete({ _id: req.query._id, })
				return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG, responseResult: DeleteData })

			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	}
}



