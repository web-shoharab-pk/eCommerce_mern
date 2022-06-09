const nodemailer = require("nodemailer");

const sendEmail = async (options) => { 
    const transporter = nodemailer.createTransport({
        service: process.env.SMPT_SERVICE, 
        host: 'smtp.gmail.com',
        port: 25,
        secure: false,
        // logger: true, 
        secureConnection: false,
        ignoreTLS: true,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        },
        tls:{
            rejectUnAuthorized:true
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;