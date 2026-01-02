import Message from "../models/Message.js";
const onlineUsers = new Map();

export const socketHandler = async (io) => {
  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      socket.userId = userId;
    });

    socket.on("send-message", async ({ senderId, receiverId, text }) => {
      const message = await Message.create({
        sender: senderId,
        receiver: receiverId,
        text,
      });
      const receiverSocket = onlineUsers.get(receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit("receive-message", message);
      }
    });
    socket.on("disconnect", () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
      }
    });
  });
};
