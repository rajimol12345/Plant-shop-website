const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel.js');
const Product = require('../models/productModel.js');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCartItems = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    res.json(cart);
  } else {
    res.json({cartItems:[]});
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addCartItem = asyncHandler(async (req, res) => {
    const { productId, qty } = req.body;

    const product = await Product.findById(productId);
  
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
  
    let cart = await Cart.findOne({ user: req.user._id });
  
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, cartItems: [] });
    }
  
    const existItem = cart.cartItems.find((x) => x.product.toString() === productId);
  
    if (existItem) {
      existItem.qty = qty;
    } else {
      const cartItem = {
        name: product.name,
        qty: qty,
        image: product.image,
        price: product.price,
        product: product._id,
      };
      cart.cartItems.push(cartItem);
    }
  
    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeCartItem = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.cartItems = cart.cartItems.filter((x) => x.product.toString() !== req.params.id);
      await cart.save();
      res.json({ message: 'Item removed' });
    } else {
      res.status(404);
      throw new Error('Cart not found');
    }
});


module.exports = {
    getCartItems,
    addCartItem,
    removeCartItem
};
