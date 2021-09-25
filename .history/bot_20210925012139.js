require("dotenv").config();
var bot_token = process.env.TELEGRAM_BOT_TOKEN;
console.log(bot_token);
const telegramBot = require("telebot");

const bot = new telegramBot(bot_tokens);

bot.on(["/start", "/hello"], (msg) => msg.reply.text("Welcome!"));

bot.start();
