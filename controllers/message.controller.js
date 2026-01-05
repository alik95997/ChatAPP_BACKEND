import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    });
    res.status(200).json(messages); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};