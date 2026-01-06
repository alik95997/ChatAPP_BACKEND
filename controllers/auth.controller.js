import jwt from "jsonwebtoken";
import { loginService, registerUserService } from "../services/auth.service.js";
import { ENV } from "../constants/index.js";

export const register = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await registerUserService(req.body);
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
    res.status(201).json({
      message: "User is created successfully.",
      id: user._id,
      name: user.name,
      user
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
      user
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const refreshAccessToken = (req, res) => {
  try {
    const incomingToken = req.cookies.refreshToken;
    console.log("incomingToken", incomingToken);
    if (!incomingToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const decodedToken = jwt.verify(incomingToken, ENV.REFRESH_TOKEN);
    console.log("decodedToken", decodedToken);
    const accessToken = jwt.sign({ id: decodedToken.id }, ENV.ACCESS_TOKEN);
    console.log(accessToken);
    const refreshToken = jwt.sign({ id: decodedToken.id }, ENV.REFRESH_TOKEN);

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "Access token refreshed" });
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

export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
