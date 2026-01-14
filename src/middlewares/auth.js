import { verifyToken } from "../utils/jwt.js";

const auth = async (req, res, next) => {
  try {
    const authHeadToken = req.headers.authorization;
    let authToken;

    if (authHeadToken && authHeadToken.startsWith("Bearer ")) {
      authToken = authHeadToken.split(" ")[1];
    } else {
      const token = req.headers.cookie;
      authToken = token.split("=")[1];
    }

    const data = await verifyToken(authToken);
    req.user = data;
    next();
  } catch (error) {
    res.status(401).send("User Not Authenticated!");
  }
};
export default auth;
