import userModel from "../models/User.js";
import ResetPassword from "../models/ResetPassword.js";

import bcrypt from "bcryptjs";
import sendEmail from "../utils/email.js";
import config from "../config/config.js";

const userRegister = async (data) => {
  const hashedPassword = bcrypt.hashSync(data.password);
  const registeredUser = await userModel.create({
    name: data.name,
    address: data.address,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
  });
  return {
    name: registeredUser.name,
    email: registeredUser.email,
    phone: registeredUser.phone,
  };
};
const userLogin = async (data) => {
  const userData = await userModel.findOne({ email: data.email });
  if (!userData) throw { statusCode: 404, message: "User not found." };
  const isPasswordMatch = bcrypt.compareSync(data.password, userData.password);
  if (!isPasswordMatch)
    throw { statusCode: 400, message: "Incorrect Password or Email" };

  return {
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    roles: userData.role,
  };
};
const forgotPassword = async (email) => {
  const user = await userModel.findOne({ email });
  if (!user) return { message: "User Not Found" };
  const token = crypto.randomUUID();
  await ResetPassword.create({ userId: user._id, token });
  await sendEmail(email, {
    subject: "Reset Password Link",
    body: `
    <div>
  <h1>Please click the link below to change the password!</h1>
  <br />
  <a href="${config.port}/reset-password?userId=${user._id}&token=${token}" 
  >Reset Password </a>
</div>
 `,
  });
  return { message: "Reset password link sent to email" };
};

const resetPassword = async (userId, token, newPassword) => {
  const data = await ResetPassword.findOne({
    expiresAt: { $gt: Date.now() },
    userId: userId,
  }).sort({ expiresAt: -1 });

  if (!data || data.token !== token) {
    throw { statusCode: 400, message: "Invalid  or expired token" };
  }
  if (data.isUsed) {
    throw { statusCode: 400, message: "Token already used" };
  }
  const updatedPassword = bcrypt.hashSync(newPassword);
  await userModel.findByIdAndUpdate(userId, { password: updatedPassword });
  await ResetPassword.findByIdAndUpdate(data._id, { isUsed: true });
  return { message: "Password changed successfully" };
};
export default { userRegister, userLogin, forgotPassword, resetPassword };
