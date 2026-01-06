import User from "../models/User.js";

export const users = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "User fetched",
      users: users,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.error.message });
  }
};
