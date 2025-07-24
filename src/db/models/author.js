import mongoose from 'mongoose';

const autorSchema = new mongoose.Schema({
  _id: String,
  name: String,
  avatar: String,
  email: String,
  followers: [String],
  following: [String],
});

export default mongoose.model('author', autorSchema);
