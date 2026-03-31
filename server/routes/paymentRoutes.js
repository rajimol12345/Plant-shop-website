const express = require('express');
const router = express.Router();
const {
    getPaypalConfig,
    confirmPaymentAndCreateOrder,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/paypal/config', protect, getPaypalConfig);
router.post('/confirm', protect, confirmPaymentAndCreateOrder);

module.exports = router;
