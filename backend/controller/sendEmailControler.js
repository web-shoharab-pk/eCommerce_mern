const ErrorHandler = require("../utils/errorHandler"); 
const catchAsyncError = require("./../middleware/catchAsyncError");
const sendEmail = require("./../utils/sendContactEmail");


exports.sendContactEmail = catchAsyncError(async (req, res, next) => {

    const {name, email, subject, message} = req.body;

    if(!name || !email || !subject || !message) {
        return next(new ErrorHandler("Please Enter All Details Perfectly!", 500));
    }

    const text = `My Name is:- ${name} \n\n  My Email is:- ${email} \n\n My Message is:- ${message}`;

    try {

        await sendEmail({
            email,
            subject,
            message: text
        });

        res.status(200).json({
            success: true,
            message: `We have reviced your email successfully`
        })
    } catch (err) {

        return next(new ErrorHandler(err.message, 500));
    }
})