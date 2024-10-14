let io;
const clients = new Map();
import { Server } from "socket.io";

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    clients.set(socket.id, socket);

    socket.on("onRequest", (data) => {
      console.log("Message from client:", data);
      socket.emit("serverMessage", "Hello from server!");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      clients.delete(socket.id);
    });
  });
}

function getIO() {
  return io;
}

function getClientSocket(id) {
  return clients.get(id);
}

export { initializeSocket, getIO, getClientSocket };
