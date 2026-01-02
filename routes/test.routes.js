import express from "express";
import { testing } from "../controllers/testing.js";
import {  verifyJWT } from "../middleware/auth.Middleware.js";

const Router = express.Router();

Router.get("/test", verifyJWT, testing);

export default Router;
