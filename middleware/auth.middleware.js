import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../constants/index.js";
export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    console.log("verify JWT middleware token", token);
    if (!token) res.json({ message: "Unauthrized" });
    const decoded = jwt.verify(token, ENV.ACCESS_TOKEN);
    console.log("verify JWT middleware decoded", decoded);

    // req.user = await User.find(decoded.id).select("-password");
    req.user = await User.find(decoded.id).select("-password");
    next();
  } catch (error) {
    console.log("authMiddleware error", error.message);
  }
};
