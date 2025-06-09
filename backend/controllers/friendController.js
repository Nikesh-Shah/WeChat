import Friend from '../model/friends.js';

// Send a friend request
export const sendFriendRequest = async (req, res) => {
  try {
    const { requesterId, recipientId } = req.body;
    const existing = await Friend.findOne({ requesterId, recipientId });
    if (existing) {
      return res.status(400).json({ message: 'Friend request already sent or exists.' });
    }
    const friend = new Friend({ requesterId, recipientId });
    await friend.save();
    res.status(201).json({ message: 'Friend request sent', data: friend });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Friend.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Friend request not found' });
    }
    res.status(200).json({ message: 'Friend request accepted', data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Block a user
export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Friend.findByIdAndUpdate(id, { status: 'blocked' }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Friend relationship not found' });
    }
    res.status(200).json({ message: 'User blocked', data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all friends for a user
export const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const friends = await Friend.find({
      $or: [
        { requesterId: userId, status: 'accepted' },
        { recipientId: userId, status: 'accepted' }
      ]
    });
    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};