const express = require("express");
const { getAllProducts } = require("../controller/productsController");

const router = express.Router();


// routes
router.route('/products').get(getAllProducts)


module.exports = router