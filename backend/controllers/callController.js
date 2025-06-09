import Call from '../model/calls.js';

// Create a new call record
export const createCall = async (req, res) => {
  try {
    const { conversationId, callerId, calleeId, callType, startedAt, endedAt, status } = req.body;
    const call = new Call({
      conversationId,
      callerId,
      calleeId,
      callType,
      startedAt,
      endedAt,
      status
    });
    await call.save();
    res.status(201).json({ message: 'Call record created', data: call });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all calls for a conversation
export const getCallsByConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const calls = await Call.find({ conversationId }).sort({ startedAt: -1 });
    res.status(200).json(calls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all calls for a user (as caller or callee)
export const getUserCalls = async (req, res) => {
  try {
    const { userId } = req.params;
    const calls = await Call.find({
      $or: [{ callerId: userId }, { calleeId: userId }]
    }).sort({ startedAt: -1 });
    res.status(200).json(calls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};