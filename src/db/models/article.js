import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    img: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    article: { type: String, required: true },
    rate: { type: Number, default: 0 },
    ownerId: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('article', articleSchema);
