const express = require('express');
const userModel = require('../model/userModel')
const { query } = require('express');
const jobSkillsModel = require('../model/skillsModel');
const responseCode = require('../responseCode')
const responseMessage = require('../responseMessage')
const status = require("../enums/status")
const userType = require('../enums/userType')

module.exports = {
	skillsAdd: async (req, res) => {
		try {
			const { skills } = req.body
			const addData = await userModel.findOne({ userType: "ADMIN" })
			if (!addData) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })
			} else {
				var skillData = await jobSkillsModel.findOne({ skills: req.body.skills })
				if (skillData) {
					return res.json({ responseCode: responseCode.ALREADY_EXIST, responsemessage: responseMessage.ALREDY_EXIST })

				} else {
					let Data = {
						skills: skills
					}
					const skillAdd = await jobSkillsModel(Data).save()
					return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.SKILL_ADD, responseResult: skillAdd })
				}
			}

		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	editSkills: async (req, res) => {
		try {
			const { skills } = req.body
			const editData = await jobTypeModel.findOne({ _id: req.query._id, userType: "ADMIN", })
			if (!editData) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })


			} else {
				let skillEdit = await jobTypeModel.findByIdAndUpdate({ _id: editData._id }, { $set: { skills: req.body.jobSkills } })
				if (skillEdit) {
					return resjson({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.DATA_EDIT, responseResult: skillEdit });

				}
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	skillsList: async (req, res) => {
		try {
			const list = await jobTypeModel.find({ userType: "ADMIN" })
			if (!list) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				return res.json({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.LIST, responseResult: list })
			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	},
	deleteSkills: async (req, res) => {
		try {
			const data = await jobTypeModel.findOne({ _id: req.query._id, userType: "ADMIN" })
			if (!data) {
				return res.json({ responseCode: responseCode.USER_NOT_FOUND, responsemessage: responseMessage.DATA_NOT_FOUND })

			} else {
				let DeleteData = await jobTypeModel.findByIdAndDelete({ _id: req.query._id, })
				res.send({ responseCode: responseCode.SUCCESS, responsemessage: responseMessage.DELETE, responseResult: DeleteData })

			}
		} catch (error) {
			return res.json({ responseCode: responseCode.SOMETHING_WRONG, responsemessage: responseMessage.SOMETHING_WRONG })
		}
	}
}
