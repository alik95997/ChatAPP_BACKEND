import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getMessages ,sendMessage} from "../controllers/message.controller.js";
const router = express.Router();

router.get("/messages/:userId", verifyJWT, getMessages);
router.post("/messages", verifyJWT, sendMessage);
export default router;
