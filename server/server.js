const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const blogRoutes = require('./routes/blogRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const adminRoutes = require('./routes/adminRoutes');
const chatRoutes = require('./routes/chatRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const http = require('http');
const { Server } = require('socket.io');
const Chat = require('./models/chatModel');

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()) 
  : ['https://plant-shop-website-2026.onrender.com', 'https://plant-shop-website-1.onrender.com', 'http://localhost:3000', 'http://localhost:3001'];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

app.set('socketio', io);

// 1. TOP-LEVEL CORS (Before anything else)
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// 2. EXTRA SAFETY MANUAL HEADERS + OPTIONS HANDLER
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    // Fallback to primary if not in list but still trying to hit API
    res.header("Access-Control-Allow-Origin", "https://plant-shop-website-2026.onrender.com");
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  }
  next();
});

// 3. OTHER MIDDLEWARE
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Socket.io logic
io.on('connection', (socket) => {
  socket.on('join_chat', (userId) => {
    socket.join(userId);
  });

  socket.on('send_message', async (data) => {
    try {
      const { chatId, userId, senderId, senderModel, senderRole, content } = data;

      if (!content || !userId) return;

      let chat;
      if (chatId) {
        chat = await Chat.findById(chatId);
      } else {
        chat = await Chat.findOne({ user: userId });
      }

      if (!chat) {
        chat = new Chat({ user: userId, messages: [] });
      }

      const newMessage = {
        sender: senderId,
        senderModel,
        senderRole,
        content,
        read: false
      };

      chat.messages.push(newMessage);
      chat.lastMessageAt = Date.now();
      await chat.save();

      io.to(userId.toString()).emit('receive_message', {
        ...newMessage,
        _id: chat.messages[chat.messages.length - 1]._id,
        createdAt: new Date(),
      });

      // Notify all admins of the new message for real-time list updates
      io.emit('new_message_alert', { userId });
    } catch (error) {
      console.error('Socket error:', error);
    }
  });

  socket.on('typing', (data) => {
    if (data.userId) {
      socket.to(data.userId.toString()).emit('display_typing', data);
    }
  });

  socket.on('disconnect', () => { });
});

// Keep production logs clean
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production' || req.path.startsWith('/api')) {
    console.log(`${req.method} ${req.url}`);
  }
  next();
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contacts', contactRoutes);

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Handle port conflicts gracefully
let serverInstance = null;
let isStarting = false;

const startServer = (port, retries = 3) => {
  // Prevent multiple simultaneous start attempts
  if (isStarting) {
    console.log('Server start already in progress, skipping...');
    return;
  }

  isStarting = true;

  // Close existing server instance if any
  if (serverInstance) {
    serverInstance.close(() => {
      console.log('Closed previous server instance');
    });
    serverInstance = null;
  }

  serverInstance = server.listen(port, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
    const listEndpoints = require('express-list-endpoints');
    console.log(listEndpoints(app));
    isStarting = false;
  });

  serverInstance.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use.`);

      if (retries > 0) {
        console.log(`Retrying in 2 seconds... (${retries} attempts remaining)`);
        setTimeout(() => {
          isStarting = false;
          startServer(port, retries - 1);
        }, 2000);
      } else {
        // Try alternative port (use parseInt to ensure numeric addition)
        const altPort = parseInt(port) + 1;
        console.log(`Trying alternative port ${altPort}...`);
        isStarting = false;
        startServer(altPort, 0);
      }
    } else {
      console.error('Server error:', err);
      isStarting = false;
      process.exit(1);
    }
  });
};

startServer(PORT);
