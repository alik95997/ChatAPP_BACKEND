import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendToken, createToken } from "../utils/sendToken.js";
import { loginService, registerUserService } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { user, token } = await registerUserService(req.body);
    res.cookie("token", token);
    res.status(201).json({
      message: "User is created successfully.",
      id: user._id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await loginService(req.body);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User Logged in Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const refreshAccessToken = (req, res) => {
  try {
    const incomingToken = req.cookies.accessToken;
    if(incomingToken){
      
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
};
