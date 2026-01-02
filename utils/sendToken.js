import jwt from "jsonwebtoken";
import { ENV } from "../constants/index.js";
export const sendToken = (res, token) => {

};

export const createToken = (id) => {
  return jwt.sign({ id }, ENV.JWT_SECRET);
};
