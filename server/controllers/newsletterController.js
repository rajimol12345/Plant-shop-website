const asyncHandler = require('express-async-handler');
const Newsletter = require('../models/newsletterModel.js');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
const subscribeToNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const emailExists = await Newsletter.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error('Email already subscribed');
  }

  const subscription = await Newsletter.create({
    email,
  });

  if (subscription) {
    res.status(201).json({
      _id: subscription._id,
      email: subscription.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid email data');
  }
});

// @desc    Get all newsletter subscribers
// @route   GET /api/newsletter
// @access  Private/Admin
const getNewsletterSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });
  res.json(subscribers);
});

// @desc    Delete newsletter subscriber
// @route   DELETE /api/newsletter/:id
// @access  Private/Admin
const deleteNewsletterSubscriber = asyncHandler(async (req, res) => {
  const subscriber = await Newsletter.findById(req.params.id);

  if (subscriber) {
    await subscriber.remove();
    res.json({ message: 'Subscriber removed' });
  } else {
    res.status(404);
    throw new Error('Subscriber not found');
  }
});

module.exports = {
  subscribeToNewsletter,
  getNewsletterSubscribers,
  deleteNewsletterSubscriber,
};
