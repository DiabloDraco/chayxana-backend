let io;
const clients = new Map();
import { Server } from "socket.io";
import UserModel from "../models/user.model.js";

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    // При подключении можно ожидать, что клиент отправит свой userId
    socket.on("registerUser", async (userId) => {
      const findedUser = await UserModel.findOne({
        where: {
          id: userId,
        },
      });

      findedUser.socketId = socket.id;
      console.log(
        `Пользователь ${userId} зарегистрирован с socket.id ${socket.id}`
      );
    });

    socket.on("disconnect", async () => {
      const findedUser = await UserModel.findOne({
        where: {
          socketId: socket.id,
        },
      });

      findedUser.socketId = null;
    });

    socket.on("courierLocationUpdate", async (data) => {
      const user = await UserModel.findOne({
        where: {
          id: data.user_id,
        },
      });

      user.location = data.location;
      await user.save();
      const client = await UserModel.findOne({
        where: {
          id: data.client_id,
        },
      });

      if (client) {
        if (client.socketId) {
          socket.to(client.socketId).emit("courierLocationUpdate", data);
        }
      }
    });
  });
}

function getIO() {
  return io;
}

async function getClientSocket(id) {
  return await UserModel.findOne({
    where: {
      id,
    },
    attributes: ["socketId"],
  });
}

export { initializeSocket, getIO, getClientSocket };
