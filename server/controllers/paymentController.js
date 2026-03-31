const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const Payment = require('../models/paymentModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');

// @desc    Get PayPal Client ID
// @route   GET /api/payment/paypal/config
// @access  Private
const getPaypalConfig = asyncHandler(async (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// @desc    Log Successful Payment and Create Order
// @route   POST /api/payment/confirm
// @access  Private
const confirmPaymentAndCreateOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentResult,
    } = req.body;

    // 1. Double check stock before final commitment
    for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product || product.countInStock < item.qty) {
            res.status(400);
            throw new Error(`${product ? product.name : 'Product'} is out of stock`);
        }
    }

    // 2. Create Payment record
    const payment = new Payment({
        user: req.user._id,
        amount: totalPrice,
        status: 'COMPLETED',
        paymentGateway: paymentResult.gateway || 'PAYPAL',
        paymentMethod: paymentMethod,
        transactionId: paymentResult.id,
        orderId: paymentResult.orderId || paymentResult.id,
        paymentDetails: paymentResult,
    });

    const createdPayment = await payment.save();

    // 3. Create Order record
    const isCOD = paymentResult.gateway === 'COD';

    const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: !isCOD,
        paidAt: isCOD ? null : Date.now(),
        paymentResult: {
            id: createdPayment.transactionId,
            status: createdPayment.status,
            update_time: createdPayment.createdAt,
            email_address: paymentResult.email_address || req.user.email,
        },
    });

    const createdOrder = await order.save();

    // 4. Decrement stock for each item
    for (const item of orderItems) {
        await Product.findByIdAndUpdate(item.product, {
            $inc: { countInStock: -item.qty }
        });
    }

    // 5. Clear user's database cart
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json(createdOrder);
});

module.exports = {
    getPaypalConfig,
    confirmPaymentAndCreateOrder,
};
