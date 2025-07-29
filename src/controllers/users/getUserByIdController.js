import { getUserByIdService } from '../../services/users/getUserByIdService.js';
import { cleanUser } from '../../utils/cleanUser.js';
import { getUserContent } from '../../utils/getUserContent.js';
export const getUserByIdController = async (req, res, next) => {
  const { userId } = req.params;

  const user = await getUserByIdService(userId);

  const cleanedUser = cleanUser(user);

  const { userArticles, savedArticles } = await getUserContent(
    userId,
    user.saved,
  );

  res.status(200).json({
    status: 200,
    message: `User with ${userId} successfully found`,
    data: {
      user: cleanedUser,
      userArticles,
      savedArticles,
    },
  });
};
