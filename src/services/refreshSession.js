import createHttpError from "http-errors";
import { Session } from "../db/models/session.js";
import { createSession } from "./loginUserService.js";

export const refreshSession = async (sessionId, sessionToken) => {
    const session = await Session.findOne({
        _id: sessionId,
        refreshToken: sessionToken,
    });

    if (!session) {
        throw createHttpError(401, 'Session not found!');
    }

    if (session.refreshTokenValidUntil < new Date()) {
        throw createHttpError(401, 'Session expired');
    }

    await Session.findOneAndDelete(sessionId);

    const newSession = await Session.create({
        ...createSession(),
        userId: session.userId,
    });

    return newSession;
};
