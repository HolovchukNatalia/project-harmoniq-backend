import { model, Schema } from 'mongoose';
import User from "./user.js";

const SessionSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            ref: User,
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
    },
);

export const Session = model('session', SessionSchema);
