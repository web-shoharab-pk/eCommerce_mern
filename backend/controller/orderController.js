const Order = require("./../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/ProductModel");
const catchAsyncError = require("./../middleware/catchAsyncError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {

    try {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalPrice,
        paymentIntent
    } = req.body;
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: orderItems.map(item => {
          return {
            price_data: {
              currency: "usd",
              unit_amount: item.price*100,
              product_data: {
                name: item.name,
                images: [item.image]
              }, 
            },
            quantity: item.quantity,
          }
        }),
        mode: 'payment',
        success_url: `${process.env.CLIENT_SITE}/order/success`,
        cancel_url: `${process.env.CLIENT_SITE}/order/cancel`,
      }) 

        res.status(201).json({
        success: true,
        url: session.url
    });


    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo: {
            status: session.payment_status,
            id: session.id
        },
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
        paymentIntent
    });

} catch (e) {
    res.status(500).json({ error: e.message })
  }
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

    const order = (await Order.find({ user: req.user._id })).reverse();

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

// UPDATE ORDER PAYMENT STATUS -- ADMIN - AUTOMATIC
exports.updatePaymentStatus = catchAsyncError(async (req, res, next) => {

    const order = (await Order.find({ user: req.user._id })).reverse();

    if (!order) {
        return next(new ErrorHandler("Order Not Found with this Id!", 404));
    }
    
    order[0].paymentInfo.status = "PAID";

    await order[0].save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        order 
    })
})


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