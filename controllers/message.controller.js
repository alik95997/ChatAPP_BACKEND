import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
