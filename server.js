import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { socketHandler } from "./socket/socket.js";

dotenv.config();
connectDB();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});
socketHandler(io);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

