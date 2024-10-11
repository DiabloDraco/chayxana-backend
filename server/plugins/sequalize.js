import { Sequelize } from "sequelize";
import winston from "winston";
import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

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

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: (msg) => logger.info(msg),
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
})();

export default sequelize;
