import mongoose from "mongoose";
import { ENV } from "../constants/index.js";

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("MongoDB is connected.");
  } catch (error) {
    console.log("MongoDb error", error.message);
  }
};

export default connectDB;
