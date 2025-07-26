import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import User from "../db/models/user.js";
import {Session} from "../db/models/session.js";


export const createSession = () => ({
    accessToken: crypto.randomBytes(30).toString('base64'),
        refreshToken: crypto.randomBytes(30).toString('base64'),
        accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15),
        refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
});

export const loginUser = async (payload) => {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
        throw createHttpError(401, 'User or password doesn`t match');
    }

    const arePasswordEqual = await bcrypt.compare(
        payload.password,
        user.password,
    );

    if (!arePasswordEqual) {
        throw createHttpError(401, 'User or password doesn`t match');
    }

    await Session.findOneAndDelete({ userId: user._id});

    const session = await Session.create({
        ...createSession(),
        userId: user._id,
    });

    return session;

 };
