const nodemailer = require('nodemailer')
const smtp = require('nodemailer-smtp-transport')
module.exports = {   
  sendMail: async (email, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: "shabnamsinghpnk123@gmail.com",
                pass: "extudijnmxhlaggt",

            },
        })

        let options = {
            from: "shabnamsinghpnk123@gmail.com",
            to: email,
            subject: subject,
            text: text,
        }
        let admin = {
            from: "shabnamsinghpnk123@gmail.com",
            to: email,
            subject: subject,
            text: text,
        }
        return await transporter.sendMail(options)
        // mg.messages().send(data,function(err,res){
        //     console.log(res)
        // })

    } catch (error) {
        console.log(error)
    }
}
}
    
  
