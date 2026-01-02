import Message from "../models/Message.js";
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const message = await Message.create({
      sender: req.user._id,
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
    const message = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        {
          sender: userId,
          receiver: req.user._id,
        },
      ],
    });
    res.staus(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
