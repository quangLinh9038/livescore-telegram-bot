require("dotenv").config();
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const telegramBot = require("telebot");

const bot = new telegramBot(TELEGRAM_BOT_TOKEN);

bot.on(["/start", "/hello"], (msg) => msg.reply.text("Welcome!"));

bot.start();
