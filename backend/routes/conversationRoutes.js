import express from 'express';
import {
  createConversation,
  getUserConversations,
  getConversationById,
  deleteConversation
} from '../controllers/conversationController.js';
import { authenticate } from '../middleware/middleware.js';

const router = express.Router();

// Create a new conversation
router.post('/', authenticate, createConversation);

// Get all conversations for a user
router.get('/user/:userId', authenticate, getUserConversations);

// Get a single conversation by ID
router.get('/:id', authenticate, getConversationById);

// Delete a conversation
router.delete('/:id', authenticate, deleteConversation);

export default router;