require("dotenv").config();
const telegramBot = require("telebot");
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new telegramBot(TELEGRAM_BOT_TOKEN);
