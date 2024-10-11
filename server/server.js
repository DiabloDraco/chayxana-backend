import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import dotenv from "dotenv";
import swagger from "./plugins/swagger.js";
import http from "http";
import winston from "winston";
import morgan from "morgan";
import { initializeSocket } from "./plugins/socket.js";
import "./models/index.js";
import "./plugins/telegram.js";
dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }), // Логи в файл
  ],
});

swagger(app);

app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

initializeSocket(server);
app.use("/file", express.static("../uploads"));
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.use("/api", routes);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
