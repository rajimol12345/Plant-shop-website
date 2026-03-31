const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'],
            default: 'PENDING',
        },
        paymentGateway: {
            type: String,
            required: true,
            enum: ['PAYPAL', 'COD'],
        },
        paymentMethod: {
            type: String, // 'card', 'upi', etc.
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
            unique: true,
        },
        orderId: {
            type: String, // Gateway specific orderId (e.g. razorpay_order_id or stripe_pi_id)
            required: true,
        },
        receiptEmail: {
            type: String,
        },
        paymentDetails: {
            type: Object, // Store raw response from gateway if needed
        },
    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
