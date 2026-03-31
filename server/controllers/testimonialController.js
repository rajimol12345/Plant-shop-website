const asyncHandler = require('express-async-handler');
const Testimonial = require('../models/testimonialModel');

// @desc    Fetch all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find({});
    res.json(testimonials);
});

module.exports = {
    getTestimonials,
};
