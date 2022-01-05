const ErrorHandler = require("../utils/errorHandler");
const Product = require("./../modals/ProductModal");
const catchAsyncError = require("./../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// create product -- admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        message: "Successfully Product Created!",
        product
    })
});


// get products
exports.getAllProducts = catchAsyncError(async (req, res) => {

    const resultPerPage = 5;
    const produtCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)

    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        produtCount
    })
});

// get single product 
exports.getProductDetails = catchAsyncError(async (req, res, next) => {



    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found!", 500))
    } else {
        await product.remove();
        res.status(200).json({
            success: true,
            product,
            produtCount
        })
    };
});

// update product -- admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found!", 500))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
});

// delete a product --admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found!", 500))
    } else {
        await product.remove();
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully!"
        })
    };
});
