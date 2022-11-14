const express = require('express');
const userModel = require('../model/userModel')
const jobTypeModel = require('../model/jobTypeModel');
const { query, response } = require('express');
const responseCode = require('../responseCode')
const responseMessage = require('../')
const status = require("../enums/status")
const userType = require('../enums/userType')
module.exports = {
	jobAdd: async (req, res) => {
		try {
			const { jobType } = req.body
			const addData = await userModel.findOne({ userType: "ADMIN" })
			if (!addData) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				var jobtypeData = await jobTypeModel.findOne({ jobType: req.body.jobType })
				if (jobtypeData) {
					return res.json({ responseCode: responseCode.ALREADY_EXIST, responsemessage: responseMessage.ALREADY_EXIST })

				} else {
					let Data = {
						jobType: jobType
					}
					const jobAdd = await jobTypeModel(Data).save()
					return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.JOBTYPE_ADD, responseResult: jobAdd })
				}
			}

		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	editJobType: async (req, res) => {
		try {
			const { jobType } = req.body
			const editData = await jobTypeModel.findOne({ _id: req.query._id, userType: "ADMIN", })
			if (!editData) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND, responseResult: [] })

			} else {
				let jobEdit = await jobTypeModel.findByIdAndUpdate({ _id: editData._id }, { $set: { jobType: req.body.jobType } })
				if (jobEdit) {
					return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.DATA_EDIT, responseResult: jobEdit });

				}
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	jobTypeList: async (req, res) => {
		try {
			const list = await jobTypeModel.find({ userType: "ADMIN" })
			if (!list) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				return res.json({ responseCode: responseCode.SUCCESS, responsemessag: responseMessage.JOBTYPE_LIST, responseResult: list })
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	deleteJobType: async (req, res) => {
		try {
			const data = await jobTypeModel.findOne({ _id: req.query._id, userType: "ADMIN" })
			if (!data) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				let DeleteData = await jobTypeModel.findByIdAndDelete({ _id: req.query._id, })
				return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.DELETE, responseResult: DeleteData })

			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	}
}
