import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import friendRoutes from './routes/friendRoutes.js';
import callRoutes from './routes/callRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server for Socket.IO
const io = new Server(server, {
  cors: {
    origin:  process.env.FRONTEND_URL, 
    methods: ['GET', 'POST']
  }
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Simple route
app.get('/', (req, res) => {
  res.send('WeChat API is running');
});

// User routes
app.use('/api/users', userRoutes);
// Message routes
app.use('/api/messages', messageRoutes);
// Conversation routes
app.use('/api/conversations', conversationRoutes);
// Friend routes
app.use('/api/friends', friendRoutes);
// Call routes
app.use('/api/calls', callRoutes);

// MongoDB connection and server start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected successfully!');
  server.listen(PORT, () => { // Use server.listen for Socket.IO
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

// --- Socket.IO logic ---
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Example: join a chat room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  // Example: send and receive messages
  socket.on('sendMessage', (data) => {
    // data: { roomId, message }
    io.to(data.roomId).emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});