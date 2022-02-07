const Order = require("./../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/ProductModel");
const catchAsyncError = require("./../middleware/catchAsyncError");

// Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});

// GET SINGLE ORDER
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order Not Found with this Id!", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
});


// GET LOGGEDIN USER ORDERS
exports.myOrders = catchAsyncError(async (req, res, next) => {

    const order = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        order
    })
});

// GET all ORDERS -- admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
});



// Update ORDERS Status -- admin
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order Not Found with this Id!", 404));
    }
     if(order.orderStatus === "Delivered") {
         return next( new ErrorHandler("You have already delivered this product!", 400))
     }
     order.orderItems.forEach(async o => {
         await updateStock(o.product, o.quantity);
     });

     order.orderStatus = req.body.status;

     if(req.body.status === "Delivered") {
        order.delivered = Date.now()
     }
     
     await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        message: "Order Status Updated!"
    })
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false}) 
};


// delete order -- admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);  
    if (!order) {
        return next(new ErrorHandler("Order Not Found with this Id!", 404));
    }
    await order.remove();
    res.status(200).json({
        success: true,
    })
});