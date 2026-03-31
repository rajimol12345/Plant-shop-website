const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.get('/dashboard', protect, admin, getDashboardStats);

module.exports = router;
