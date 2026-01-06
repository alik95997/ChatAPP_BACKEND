import express from "express";
const router = express.Router();
import {
  register,
  login,
  logout,
  refreshAccessToken,
  getMe,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
router.post("/register", register);
router.post("/login", login);
router.post("/refreshAccessToken", refreshAccessToken);
router.get("/me", verifyJWT, getMe);
router.post("/logout", logout);

export default router;
