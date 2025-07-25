import { logoutUser } from "../services/logoutUserService.js";

export const logoutUserController = async (req, res) => {
    const { sessionId, sessionToken } = req.cookies;
    await logoutUser(sessionId, sessionToken);

    res.clearCookie('sessionToken');
    res.clearCookie('sessionId');

    res.status(204).send();

};
