require("dotenv").config();

var bot_token = process.env.TELEGRAM_BOT_TOKEN;
const telegramBot = require("telebot");

const bot = new telegramBot(bot_token);

bot.on(["/start", "/hello"], (msg) => msg.reply.text("Welcome!"));


bot.on(["/real"], (file) => )
bot.start();
