import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    articlesAmount: { type: Number, default: 0 },
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('user', userSchema);
