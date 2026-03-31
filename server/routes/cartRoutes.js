const express = require('express');
const router = express.Router();
const {
  getCartItems,
  addCartItem,
  removeCartItem,
} = require('../controllers/cartController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(protect, getCartItems).post(protect, addCartItem);
router.route('/:id').delete(protect, removeCartItem);

module.exports = router;
