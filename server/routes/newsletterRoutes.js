const express = require('express');
const router = express.Router();
const {
  subscribeToNewsletter,
  getNewsletterSubscribers,
  deleteNewsletterSubscriber,
} = require('../controllers/newsletterController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.route('/')
  .get(protect, admin, getNewsletterSubscribers);

router.route('/:id')
  .delete(protect, admin, deleteNewsletterSubscriber);

router.route('/subscribe').post(subscribeToNewsletter);

module.exports = router;
