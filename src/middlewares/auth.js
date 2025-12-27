import { verifyToken } from "../utils/jwt.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.cookie;
    const authToken = token.split("=")[1];
    const data = await verifyToken(authToken);
    req.user = data;
    next();
  } catch (error) {
    res.status(401).send("User Not Authenticated!");
  }
};
export default auth;
