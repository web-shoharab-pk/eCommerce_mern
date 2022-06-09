const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/ProductModel");
const catchAsyncError = require("./../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


// create product -- admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    let imagesLink = [];

    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products"
        })

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLink;
    req.body.user = req.user.id;


    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        message: "Successfully Product Created!",
        product
    })
});


// get products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)

    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage
    })
});

// GET PRODUCT LIST (ADMIN)
exports.getAdminProduct = catchAsyncError(async (req, res, next) => {

    const products = await Product.find()

    res.status(200).json({
        success: true,
        products
    })
});

// get single product 
exports.getProductDetails = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found!", 500))
    }
    res.status(200).json({
        success: true,
        product
    })
});

// update product -- admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found!", 500))
    }

    // images update here

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        
        let imagesLink = [];

        // DELETING IMAGES FROM CLOUDINARY
        for (let i = 0; i < product.images.length; i++) {
            const element = product.images[i];

            const result = await cloudinary.v2.uploader.destroy(element.public_id);

            for (let i = 0; i < images.length; i++) {

                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products"
                })

                imagesLink.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })

            }

        }
        req.body.images = imagesLink;
        req.body.user = req.user.id;
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

    console.log('deleteProduct', req.params.id)
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found!", 500))
    }

    // DELETING IMAGES FROM CLOUDINARY

    for (let i = 0; i < product.images.length; i++) {
        const element = product.images[i];

        const result = await cloudinary.v2.uploader.destroy(element.public_id);

    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully!"
    })

});


// Create Review 
exports.createProductReview = catchAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };
    const product = await Product.findById({ _id: productId });

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
                product.numOfReviews = product.reviews.length
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;

    product.reviews.forEach(rev => {
        avg = avg + rev.rating
    });
    product.rating = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })
});

// GET ALL REVIEWS OF A PRODUCT 
exports.getProductReviews = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found!", 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
});

// DELETE REVIEWS OF A PRODUCT 
exports.deleteProductReviews = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found!", 404))
    }

    const reviews = product.reviews.filter((rev) => rev.user.toString() !== req.user._id.toString());

    let avg = 0;

    reviews.forEach(rev => {
        avg = avg + rev.rating
    });
    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

    res.status(200).json({
        success: true
    })
});