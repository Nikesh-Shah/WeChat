import Message from '../model/message.js';

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, content, mediaUrl } = req.body;
    const message = new Message({
      conversationId,
      senderId,
      content,
      mediaUrl
    });
    await message.save();
    res.status(201).json({ message: 'Message sent', data: message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all messages in a conversation
export const getMessagesByConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted', data: deletedMessage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};