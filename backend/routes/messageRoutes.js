import express from 'express';
import {
  sendMessage,
  getMessagesByConversation,
  deleteMessage
} from '../controllers/messageController.js';
import { authenticate } from '../middleware/middleware.js';

const router = express.Router();

// Send a new message
router.post('/', authenticate, sendMessage);

// Get all messages in a conversation
router.get('/:conversationId', authenticate, getMessagesByConversation);

// Delete a message
router.delete('/:id', authenticate, deleteMessage);

export default router;