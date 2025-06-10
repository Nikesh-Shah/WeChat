import express from 'express';
import {
  createCall,
  getCallsByConversation,
  getUserCalls
} from '../controllers/callController.js';
import { authenticate } from '../middleware/middleware.js';

const router = express.Router();

// Create a new call record
router.post('/', authenticate, createCall);

// Get all calls for a conversation
router.get('/conversation/:conversationId', authenticate, getCallsByConversation);

// Get all calls for a user (as caller or callee)
router.get('/user/:userId', authenticate, getUserCalls);

export default router;