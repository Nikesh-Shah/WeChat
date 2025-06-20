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
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('WeChat API is running');
});

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/calls', callRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(' MongoDB connected successfully!');
  server.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error(' MongoDB connection error:', err.message);
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('sendMessage', (data) => {
    io.to(data.roomId).emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});