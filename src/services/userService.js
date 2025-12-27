import userModel from "../models/User.js";
import uploadFile from "../utils/file.js";
import { ADMIN, MERCHANT, USER } from "../constants/roles.js";

const createUser = async (data) => await userModel.create(data);
const getUsers = async () => await userModel.find();
const getUserById = async (data) => await userModel.findById(data);
const updateUser = async (id, data, authUser) => {
  const user = await getUserById(id);

  if (user._id !== authUser._id && !authUser.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access Denied",
    };
  }
  const updatedUser = await userModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedUser;
};
const userDelete = async (data) => await userModel.findByIdAndDelete(data);

const updateUserProfileImage = async (id, photo) => {
  const uploadedFiles = await uploadFile([photo]);

  const userData = await userModel.findByIdAndUpdate(
    id,
    { profileImage: uploadedFiles[0]?.url },
    { new: true }
  );
  return userData;
};
const createMerchant = async (data) => {
  if (!data)
    throw {
      statusCode: 400,
      message: "User Id is required.",
    };
  const userData =  await userModel.findById(data)
   if(!userData)  throw {
      statusCode: 400,
      message: "User Not found.",
    };
  return await userModel.findByIdAndUpdate(
    data,
    {
      role: [USER,MERCHANT],
    },
    { new: true }
  );
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  userDelete,
  updateUserProfileImage,
  createMerchant
};
