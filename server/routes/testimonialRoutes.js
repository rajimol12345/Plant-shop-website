const express = require('express');
const router = express.Router();
const { getTestimonials } = require('../controllers/testimonialController');

router.route('/').get(getTestimonials);

module.exports = router;
