const express = require("express");
const { sendContactEmail } = require("../controller/sendEmailControler");
const router = express.Router();

router.route('/email/contact').post(sendContactEmail);


module.exports = router;