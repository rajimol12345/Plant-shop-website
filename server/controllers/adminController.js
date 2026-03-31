const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const Order = require('../models/orderModel.js');
const Product = require('../models/productModel.js');
const Blog = require('../models/blogModel.js');
const Newsletter = require('../models/newsletterModel.js');
const Chat = require('../models/chatModel.js');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    // 1. Total Sales (Real Data)
    const orders = await Order.find({ isPaid: true });
    const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    // 2. Total Orders (Real Count)
    const totalOrders = await Order.countDocuments({});

    // 3. Total Products (Real Count)
    const totalProducts = await Product.countDocuments({});

    // 4. Total Users (Real Count)
    const totalUsers = await User.countDocuments({});

    // 5. Monthly Sales for Chart (Actual MongoDB Aggregation)
    const salesData = await Order.aggregate([
        {
            $project: {
                month: { $month: "$createdAt" },
                year: { $year: "$createdAt" },
                totalPrice: 1,
                isPaid: 1
            }
        },
        { $match: { isPaid: true } },
        {
            $group: {
                _id: { month: "$month", year: "$year" },
                totalSales: { $sum: "$totalPrice" }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Format salesData for Recharts without mock fields
    const expandedSalesData = salesData.map(item => {
        const date = new Date();
        date.setMonth(item._id.month - 1);
        return {
            name: date.toLocaleString('default', { month: 'short' }),
            sales: Number(item.totalSales.toFixed(2)),
        };
    });

    // 6. Low Stock Products (Real Count)
    const lowStockCount = await Product.countDocuments({ countInStock: { $lt: 5 } });

    // 7. Store Status specific counts (Real MongoDB Queries)
    const pendingOrders = await Order.countDocuments({ isPaid: false });
    const paidOrders = await Order.countDocuments({ isPaid: true });
    const totalBlogs = await Blog.countDocuments({});
    const totalSubscribers = await Newsletter.countDocuments({});

    // 8. Unread Chats (Conversations with unread customer messages)
    const chats = await Chat.find({});
    const unreadChatsCount = chats.filter(chat =>
        chat.messages.some(m => !m.read && m.senderRole === 'customer')
    ).length;


    res.json({
        totalSales: Number(totalSales.toFixed(2)),
        totalOrders,
        totalProducts,
        totalUsers,
        monthlySales: expandedSalesData,
        storeStatus: {
            lowStock: lowStockCount,
            pending: pendingOrders,
            paid: paidOrders,
            blogs: totalBlogs,
            subscribers: totalSubscribers,
            unreadChats: unreadChatsCount
        }
    });
});

module.exports = {
    getDashboardStats,
};
