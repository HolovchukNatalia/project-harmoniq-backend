import { model, Schema } from 'mongoose';

const SessionSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref: 'user',
    unique: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessTokenValidUntil: {
    type: Date,
    required: true,
  },
  refreshTokenValidUntil: {
    type: Date,
    required: true,
  },
});

export const Session = model('Session', SessionSchema);
