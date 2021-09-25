require("dotenv").config();
var bot_token = process.env.TELEGRAM_BOT_TOKEN;

const getFixtures = require("./app");
const telegramBot = require("telebot");

const bot = new telegramBot(bot_token);

bot.on(["/start", "/hello"], (msg) => msg.reply.text(getFixtures));

bot.start();
