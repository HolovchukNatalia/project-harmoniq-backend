import { Session } from "../db/models/session.js";

export const logoutUser = async (sessionId, sessionToken) => {
    await Session.findOneAndDelete({
        _id: sessionId,
        refreshToken: sessionToken,
    });
};
