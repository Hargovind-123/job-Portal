const staticModel = require('../model/statticModel');
const responseCode = require('../responseCode')
 const responseMessage = require('../responseMessage')
 module.exports = ({
    view: async (req, res)=>{
        try {
            let admin = await staticModel.find({_id: req.query._id , status:"ACTIVE", userType:"ADMIN"})
            if(!admin){
                res.send({ responseCode: responseCode.USER_NOT_FOUND, responseMessage: responseMessage.DATA_NOT_FOUND})

            }else{
                return res.send({ responseCode:responseCode.SUCCESS, responseMessage: responseMessage.STATIC_VIEW, responseResult: admin})
            }
        } catch (error) {
            res.send({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG})
        }
    },
    list: async (req, res) => {
        try {
            let admin = await staticModel.find({ status: "ACTIVE" })
            if (!admin) {
                res.send({ responseCode: responseCode.USER_NOT_FOUND, responseMessage: responseMessage.CONTENET, responseResult: [] })
            } else {
                return res.send({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.STATIC_LIST, responseResult: admin })
            }
        } catch (error) {
            res.send({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: error.message })
        }
    },
    add: async (req, res) => {
        try {
            let admin = await staticModel.findOne({ _id: req.query._Id, status: "ACTIVE", userType: "ADMIN" })
            if (!admin) {
                res.send({ responseCode: responseCode.USER_NOT_FOUND, responseMessage: responseMessage.CONTENET, responseResult: [] })
            } else {
                let userAdd = await staticModel.findByIdAndUpdate({ _id: admin._id }, { $set: { description: req.body.description, type: req.body.type, title: req.body.title } }, { new: true })
                if (userAdd) {
                    return res.send({ responseCode: responseCode.SUCCESS, responseMessage: responseMessage.STATIC_ADD, responseResult: userAdd })
                }
            }
        } catch (error) {
            res.send({ responseCode: responseCode.SOMETHING_WRONG, responseMessage: responseMessage.SOMETHING_WRONG, responseResult: error.message })
        }
    }
})
