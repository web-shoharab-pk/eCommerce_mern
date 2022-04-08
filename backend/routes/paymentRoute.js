const express = require("express");
const { processPayment, sendStripApiKey } = require("../controller/paymentController");
const router = express.Router();
const {isAuthenticatedUser} = require("./../middleware/auth");

router.route('/payment/process').post(isAuthenticatedUser, processPayment);

router.route('/stripe/api/key').get(isAuthenticatedUser, sendStripApiKey);


module.exports = router;