import express from "express";
import { verifyJWT } from "../middleware/auth.Middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
const router = express.Router();

router.post("/send", verifyJWT, sendMessage);
router.get("/:userId", verifyJWT, getMessages);
export default router;
