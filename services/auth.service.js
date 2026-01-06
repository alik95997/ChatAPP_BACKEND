import { ENV } from "../constants/index.js";
import User from "../models/User.js";
import { createToken } from "../utils/sendToken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const registerUserService = async (body) => {
  const { email } = body;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new Error("User Already Exist");
  }
  const user = await User.create(body);
  console.log(user);

  const accessToken = jwt.sign({ userId: user._id }, ENV.ACCESS_TOKEN, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId: user._id }, ENV.REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  return { user, accessToken, refreshToken };
};

export const loginService = async (body) => {
  try {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Does not Exist");
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new Error("Invalid credential email");
    }
    // const token = jwt.sign(user._id);
    const accessToken = jwt.sign({ userId: user._id }, ENV.ACCESS_TOKEN, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId: user._id }, ENV.REFRESH_TOKEN, {
      expiresIn: "7d",
    });
    return {
      user,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log("loginError Service", error.message);
  }
};
