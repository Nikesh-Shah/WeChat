import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'blocked'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Friend', friendSchema);