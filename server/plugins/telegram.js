import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

// Замените YOUR_TELEGRAM_BOT_TOKEN на токен вашего бота
const token = "7512967435:AAGLTtqd0yZZfezrvlqVaRW9sac4uTXcLTs";
const bot = new TelegramBot(token, { polling: true });

// ID канала, в который бот будет отправлять сообщения (например, @my_channel)
const channelId = "-1002246176309";
const auth_channel = "-1002348482263";

// Отправить сообщение в канал
const sendMessageToChannel = async (message) => {
  const formattedMessage = `\`\`\`\n${message}\n\`\`\``; // Используем MarkdownV2 для форматирования кода
  await bot
    .sendMessage(channelId, message)
    .then(() => {
      console.log("Message sent");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

const sendMessageToAuthChannel = async (message) => {
  const formattedMessage = `\`\`\`\n${message}\n\`\`\``; // Используем MarkdownV2 для форматирования кода
  await bot
    .sendMessage(auth_channel, message)
    .then(() => {
      console.log("Message sent");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome! Use /send to send a message to the channel."
  );
});

export { sendMessageToChannel, sendMessageToAuthChannel };
