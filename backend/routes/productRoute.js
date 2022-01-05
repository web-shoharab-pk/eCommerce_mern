const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controller/productsController");

const router = express.Router();


// routes
router.route('/products').get(getAllProducts);


router.route('/product/new').post(createProduct);


router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails);


// router.route('/product/:id').delete(deleteProduct);


module.exports = router