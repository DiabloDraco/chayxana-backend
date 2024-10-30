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

      findedUser.socket_id = socket.id;
      console.log(
        `Пользователь ${userId} зарегистрирован с socket.id ${socket.id}`
      );
    });

    socket.on("disconnect", async () => {
      const findedUser = await UserModel.findOne({
        where: {
          socket_id: socket.id,
        },
      });

      findedUser.socket_id = null;

      findedUser.save();
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
        if (client.socket_id) {
          socket.to(client.socket_id).emit("courierLocationUpdate", data);
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
