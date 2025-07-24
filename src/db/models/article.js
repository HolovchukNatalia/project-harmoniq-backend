import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [5, 'Title too short (min 5 characters)'],
      maxlength: [120, 'Title too long (max 120 characters)'],
    },
    desc: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description too short (min 10 characters)'],
      maxlength: [250, 'Description too long (max 250 characters)'],
    },
    article: {
      type: String,
      required: [true, 'Article content is required'],
      minlength: [100, 'Article too short (min 100 characters)'],
    },
    rate: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
    },
    ownerId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: [true, 'Author ID is required'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Article', articleSchema);
