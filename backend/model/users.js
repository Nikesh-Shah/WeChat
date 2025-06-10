import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  phone: { type: String, trim: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  online: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Add this line
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);