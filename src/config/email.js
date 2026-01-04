 const nodemailer = require('nodemailer')
 const {SMTP_HOST,SMTP_USER,SMTP_PASS} = require('./env')

 const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    })

module.exports = transporter