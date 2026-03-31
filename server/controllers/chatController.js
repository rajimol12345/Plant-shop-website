const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');

// @desc    Get chat history for a user
// @route   GET /api/chat/:userId
// @access  Private
const getChatHistory = asyncHandler(async (req, res) => {
    const chat = await Chat.findOne({ user: req.params.userId })
        .populate('user', 'name email image')
        .populate('messages.sender', 'name image');

    if (chat) {
        const unreadCount = chat.messages.filter(m => !m.read && m.senderRole === 'admin').length;
        res.json({
            ...chat._doc,
            unreadCount
        });
    } else {
        res.json({ messages: [], user: req.params.userId, unreadCount: 0 });
    }
});

// @desc    Get all chats for admin
// @route   GET /api/chat/admin/all
// @access  Private/Admin
const getAdminChats = asyncHandler(async (req, res) => {
    const chats = await Chat.find({})
        .populate('user', 'name email image')
        .sort({ lastMessageAt: -1 });

    const chatsWithUnread = chats.map(chat => {
        const unreadCount = chat.messages.filter(m => !m.read && m.senderRole === 'customer').length;
        return {
            ...chat._doc,
            unreadCount
        };
    });

    res.json(chatsWithUnread);
});

// @desc    Mark messages as read
// @route   PUT /api/chat/read/:chatId
// @access  Private
const markAsRead = asyncHandler(async (req, res) => {
    const chat = await Chat.findById(req.params.chatId);

    if (chat) {
        chat.messages.forEach(msg => {
            // If admin is marking as read, mark customer messages as read
            // If customer is marking as read, mark admin messages as read
            if (msg.senderRole !== (req.user.isAdmin ? 'admin' : 'customer')) {
                msg.read = true;
            }
        });
        await chat.save();
        res.json({ message: 'Messages marked as read' });
    } else {
        res.status(404);
        throw new Error('Chat not found');
    }
});

// @desc    Admin reply to a chat
// @route   POST /api/chat/reply
// @access  Private/Admin
const replyToChat = asyncHandler(async (req, res) => {
    const { chatId, content, userId } = req.body;

    const chat = await Chat.findById(chatId);

    if (chat) {
        const newMessage = {
            sender: req.user._id,
            senderModel: 'Admin',
            senderRole: 'admin',
            content,
            read: false,
        };

        chat.messages.push(newMessage);
        chat.lastMessageAt = Date.now();

        // Mark all customer messages in this chat as read
        chat.messages.forEach(msg => {
            if (msg.senderRole === 'customer') {
                msg.read = true;
            }
        });

        await chat.save();

        const io = req.app.get('socketio');
        if (io) {
            io.to(userId.toString()).emit('receive_message', {
                ...newMessage,
                _id: chat.messages[chat.messages.length - 1]._id,
                createdAt: new Date(),
            });
        }

        res.status(201).json(chat);
    } else {
        res.status(404);
        throw new Error('Chat not found');
    }
});

// @desc    Delete a message
// @route   DELETE /api/chat/:chatId/message/:messageId
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
    const { chatId, messageId } = req.params;
    const chat = await Chat.findById(chatId);

    if (chat) {
        // Find the message in the array
        const messageIndex = chat.messages.findIndex(
            (msg) => msg._id.toString() === messageId
        );

        if (messageIndex > -1) {
            const message = chat.messages[messageIndex];

            // Check authorization: Admin can delete any, User can only delete their own
            // For this implementation, we allow admin to delete any message
            if (req.user.isAdmin || message.sender.toString() === req.user._id.toString()) {
                chat.messages.splice(messageIndex, 1);
                await chat.save();
                res.json({ message: 'Message removed' });
            } else {
                res.status(401);
                throw new Error('Not authorized to delete this message');
            }
        } else {
            res.status(404);
            throw new Error('Message not found');
        }
    } else {
        res.status(404);
        throw new Error('Chat not found');
    }
});

// @desc    Edit a message
// @route   PUT /api/chat/:chatId/message/:messageId
// @access  Private
const editMessage = asyncHandler(async (req, res) => {
    const { chatId, messageId } = req.params;
    const { content } = req.body;
    const chat = await Chat.findById(chatId);

    if (chat) {
        const message = chat.messages.id(messageId);

        if (message) {
            // Check authorization: Users/Admins can only edit their own messages
            if (message.sender.toString() === req.user._id.toString()) {
                message.content = content;
                await chat.save();
                res.json({ message: 'Message updated', content });
            } else {
                res.status(401);
                throw new Error('Not authorized to edit this message');
            }
        } else {
            res.status(404);
            throw new Error('Message not found');
        }
    } else {
        res.status(404);
        throw new Error('Chat not found');
    }
});

module.exports = {
    getChatHistory,
    getAdminChats,
    markAsRead,
    replyToChat,
    deleteMessage,
    editMessage,
};
