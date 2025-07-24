import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 32,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: 64,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 64,
        },
    },
    {
        timestamps: true,
    }
);

export const User = model('User', userSchema);
