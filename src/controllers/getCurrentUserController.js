export const getCurrentUserController = (req, res) => {
  const user = req.user;

  res.status(200).json({
    status: 'success',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};
