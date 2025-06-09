import Conversation from '../model/conversations.js';

// Create a new conversation
export const createConversation = async (req, res) => {
  try {
    const { members, isGroup, groupName, createdBy } = req.body;
    const conversation = new Conversation({
      members,
      isGroup,
      groupName,
      createdBy
    });
    await conversation.save();
    res.status(201).json({ message: 'Conversation created', data: conversation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all conversations for a user
export const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({ members: userId }).sort({ createdAt: -1 });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single conversation by ID
export const getConversationById = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findById(id);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a conversation
export const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedConversation = await Conversation.findByIdAndDelete(id);
    if (!deletedConversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    res.status(200).json({ message: 'Conversation deleted', data: deletedConversation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};