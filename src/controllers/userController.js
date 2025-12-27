import userService from "../services/userService.js";

const createUser = async (req, res) => {
  try {
    const data = await userService.createUser(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};
const getUsers = async (req, res) => {
  try {
    const usersData = await userService.getUsers();
    res.status(201).json(usersData);
  } catch (error) {
    res.send(error.message);
  }
};
const getUserById = async (req, res) => {
  try {
    const userById = req.params.id;
    const user = await userService.getUserById(userById);
    res.status(201).json(user);
  } catch (error) {
    res.send(error.message);
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await userService.updateUser(
      userId,
      req.body,
      req.user
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    res.send(error.message);
  }
};
const createMerchant = async (req, res) => {
  const userId = req.body.userId;

  try {
    const data = await userService.createMerchant(userId);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const userDelete = async (req, res) => {
  try {
    const userId = req.params.id;
    await userService.userDelete(userId);
    res.status(201).send(`User with id:${userId} deleted successfully`);
  } catch (error) {
    res.send(error.message);
  }
};
const UpdateProfileImage = async (req, res) => {
  try {
    const userPhoto = req.file;
    const userId = req.params.id;
    const data = await userService.updateUserProfileImage(userId, userPhoto);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  userDelete,
  UpdateProfileImage,
  createMerchant,
};
