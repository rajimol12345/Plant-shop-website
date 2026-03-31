const express = require('express');
const router = express.Router();
const {
    getChatHistory,
    getAdminChats,
    markAsRead,
    replyToChat,
    deleteMessage,
    editMessage,
} = require('../controllers/chatController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/admin/all').get(protect, admin, getAdminChats);
router.route('/reply').post(protect, admin, replyToChat);
router.route('/read/:chatId').put(protect, markAsRead);
router.route('/:chatId/message/:messageId').delete(protect, deleteMessage).put(protect, editMessage);
router.route('/:userId').get(protect, getChatHistory);

module.exports = router;
