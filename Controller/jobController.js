const express = require('express');
const userModel = require('../model/userModel')
const { query } = require('express');
const planModel = require('../model/jobModel');
const jobModel = require('../model/jobModel');
const responseCode = require('../responseCode')
const responseMessage = require('../responseMessage')
const status = require("../enums/status")
const userType = require('../enums/userType')
module.exports = {
	addJob: async (req, res) => {
		try {
			const { category, jobType, company, jobLocation, jobTitle, vacancy, lastDate, skillNeeded, minWorkExperience, maxWorkExperience, minAnnualCTC, maxAnnualCTC, currency, qualification } = req.body
			const addData = await userModel.findOne({ userType: "ADMIN" })
			if (!addData) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				var jobData = await jobModel.findOne({ jobTitle: req.body.jobTitle })
				if (jobData) {
					return res.json({ responseCode: responseCode.ALREADY_EXIST, responsemessage: responseMessage.ALREADY_EXIST })

				} else {
					let jobData = {
						category: category,
						jobType: jobType,
						jobTitle: jobTitle,
						company: company,
						jobLocation: jobLocation,
						jobTitle: jobTitle,
						vacancy: vacancy,
						lastDate: lastDate,
						skillNeeded: skillNeeded,
						minWorkExperience: minWorkExperience,
						maxWorkExperience: maxWorkExperience,
						minAnnualCTC: minAnnualCTC,
						maxAnnualCTC: maxAnnualCTC,
						currency: currency,
						qualification: qualification
					}
					const jobAdd = await planModel(jobData).save()
					return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.JOB_ADD, responseResult: jobAdd })
				}
			}

		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	jobList: async (req, res) => {
		try {
			const list = await jobModel.find({ userType: "ADMIN" })
			if (!list) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				return res.json({ responseCode: 200, responsemessage: responseMessage.LIST, responseResult: list })
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	editJobData: async (req, res) => {
		try {
			const { category, jobType, company, jobLocation, jobTitle, vacancy, lastDate, skillNeeded, minWorkExperience, maxWorkExperience, minAnnualCTC, maxAnnualCTC, currency, qualification } = req.body
			const editData = await jobModel.findOne({ _id: req.query._id, userType: "ADMIN", })
			if (!editData) {
				return res.json({ responseCode: responseMessage.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				let jobEdit = await jobModel.findByIdAndUpdate({ _id: editData._id }, { $set: { category: req.body.category, jobType: req.body.jobType, company: req.body.company, jobLocation: req.body.company, jobTitle: req.body.jobLocation, vacancy: req.body.jobTitle, lastDate: req.body.lastDate, skillNeeded: req.body.lastDate, minWorkExperience: req.body.minWorkExperience, maxWorkExperience: req.body.minWorkExperience, minAnnualCTC: req.body.minAnnualCTC, maxAnnualCTC: req.body.maxAnnualCTC, currency: req.body.currency, qualification: req.body.qualification } })

				if (jobEdit) {
					return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.DATA_EDIT, responseResult: jobEdit });
				}
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	jobDelete: async (req, res) => {
		try {
			const deleteData = await jobModel.findOne({ _id: req.query._id })

			if (!deleteData) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })


			} else {
				const data = await planModel.findByIdAndDelete({ _id: deleteData._id })
				return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.DELETE, responseResult: data })
			}
		} catch (error) {
			res.send({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
}
