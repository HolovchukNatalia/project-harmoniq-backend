import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [32, 'Name cannot exceed 32 characters'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      maxlength: [64, 'Email cannot exceed 64 characters'],
      validate: {
        validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: 'Invalid email format',
      },
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      maxlength: [64, 'Password cannot exceed 64 characters'],
    },
    saved: {
      default: [],
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Artile',
    },
    avatarUrl: {
      type: String,
      default: '',
    },

    articlesAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('user', userSchema);
