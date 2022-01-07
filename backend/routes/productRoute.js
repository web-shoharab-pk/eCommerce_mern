const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controller/productsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


// routes
router.route('/products').get(getAllProducts);


router.route('/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);


router.route('/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
    .get(getProductDetails);


// router.route('/product/:id').delete(deleteProduct);


module.exports = router