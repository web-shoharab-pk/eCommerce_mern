// Creating Token & Saving token

const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken();

    // options for cookies
    const options = {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    };

    res.cookie('token', token, options).status(statusCode).json({
        success: true,
        user,
        token
    });
};

module.exports = sendToken