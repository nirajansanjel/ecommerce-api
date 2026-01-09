import userService from "../services/authService.js";
import { createToken } from "../utils/jwt.js";
const userRegister = async (req, res) => {
  try {
    const input = req.body;
    if (!input.password) {
      return res.status(400).send("Password is required");
    }
    if (!input.confirmPassword) {
      return res.status(400).send(" confirm Password is required");
    }
    if (input.password != input.confirmPassword) {
      res.status(400).send("Passwords do not match");
    }
    const createdUser = await userService.userRegister(req.body);
    const authToken = createToken(createdUser);
    // res.cookie("authToken", authToken, { maxAge: 86400 * 1000 });
    res.status(201).json({...createdUser, authToken});
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const userLogin = async (req, res) => {
  try {
    const input = req.body;

    if (!input) {
      return res.status(400).send("Email and password are required!");
    }
    if (!input.email) {
      return res.status(400).send("Email is required");
    }
    if (!input.password) {
      return res.status(400).send("Password is required");
    }

    const data = await userService.userLogin(input);
    const authToken = createToken(data);
    res.cookie("authToken", authToken, { maxAge: 86400 * 1000 });

    res.status(200).json({...data,authToken});
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const forgotPassword = async (req, res) => {
  try {
    const data = req.body;
    if (!data.email) {
      res.status(400).send("Invalid Input");
    }
    const result = await userService.forgotPassword(data.email);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};
const resetPassword = async (req, res) => {
  try {
    const input = req.body;
    const query = req.query;
    if (!query.token) {
      return res.status(400).send(" Token is required");
    }
    if (!query.userId) {
      return res.status(400).send("User id is required");
    }
    if (!input.password) {
      return res.status(400).send("Password is required");
    }
    if (!input.confirmPassword) {
      return res.status(400).send(" confirm Password is required");
    }
    if (input.password != input.confirmPassword) {
      res.status(400).send("Passwords do not match");
    }
    await userService.resetPassword(query.userId, query.token, input.password);
    res.status(200).send("Password Changed Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default { userRegister, userLogin, forgotPassword, resetPassword };
