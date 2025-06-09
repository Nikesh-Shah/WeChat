import mongoose from 'mongoose';

const callSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  callerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  calleeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  callType: { type: String, enum: ['audio', 'video'], required: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
  status: { type: String, enum: ['missed', 'completed', 'rejected'], default: 'completed' }
});

export default mongoose.model('Call', callSchema);