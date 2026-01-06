import express from "express";
import { users } from "../controllers/users.js";
import { verifyJWT } from "../middleware/auth.Middleware.js";

const Router = express.Router();

Router.get("/users", verifyJWT, users);

export default Router;
