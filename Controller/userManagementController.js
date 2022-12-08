const userModel = require('../model/userModel')
module.exports = {

list: async (req, res) => {
    try {
       let userMangement = await userModel.find({ status:"ACTIVE" })
        if (!userMangement) {
            res.send({ responseCode: 409, responseMessage: "No Content Found", responseResult: [] })
        } else {
            return res.send({ responseCode: 200, responseMessage: "Content Found Successfully", responseResult: userMangement })
        }
    } catch (error) {
        res.send({ responseCode: 501, responseMessage: "Something Was Wrong", responseResult: error.message })
    }
},
view: async (req, res) => {
    try {

        let userMangement = await userModel.findOne({ _id: req.query._id, })
        console.log("==============================20", userMangement)
        if (!userMangement) {
            res.send({ responseCode: 409, responseMessage: "No Content Found", responseResult: [] })
        } else {
            return res.send({ responseCode: 200, responseMessage: "Content Found Successfully", responseResult: userMangement })
        }
    } catch (error) {
        res.send({ responseCode: 501, responseMessage: "Something Was Wrong", responseResult: error.message })
    }
},
delete: async (req, res) => {
    try {
        let userMangement = await userModel.findOne({ _id: req.query._id })
        if (!userMangement) {
            res.send({ responseCode: 409, responseMessage: "No Content Found", responseResult: [] })
        } else {
            let userMangementupdate = await userModel.findByIdAndDelete({ _id: req.query._id }, { new: true })
            return res.send({ responseCode: 200, responseMessage: "Content Deleted Successfully", responseResult: userMangementupdate })
        }
    } catch (error) {
        res.send({ responseCode: 501, responseMessage: "Something Went Wrong", responseResult: error.message })
    }
},
block: async (req, res) => {
    try {
        let userMangement = await userModel.findOne({ _id: req.query._id })
        if (!userMangement) {
            res.send({ responseCode: 409, responseMessage: "Content not Found", responseResult: [] })
        } else {
            let userMangementupdate = await userModel.findByIdAndUpdate({ _id: req.query._id }, { $set: { status: "BLOCK" } }, { new: true })
            if (userMangementupdate) {
                return res.send({ responseCode: 200, responseMessage: "Content Edit Successfully", responseResult: userMangementupdate })
            }
        }
    } catch (error) {
        res.send({ responseCode: 501, responseMessage: "Something went Wrong", responseResult: error.message })
    }
}
}


