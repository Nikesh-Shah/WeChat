import express from 'express';
import {
  sendFriendRequest,
  acceptFriendRequest,
  blockUser,
  getFriends
} from '../controllers/friendController.js';
import { authenticate } from '../middleware/middleware.js';

const router = express.Router();

// Send a friend request
router.post('/', authenticate, sendFriendRequest);

// Accept a friend request
router.patch('/accept/:id', authenticate, acceptFriendRequest);

// Block a user
router.patch('/block/:id', authenticate, blockUser);

// Get all friends for a user
router.get('/:userId', authenticate, getFriends);

export default router;