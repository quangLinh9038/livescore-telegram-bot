require("dotenv").config();

var bot_token = process.env.TELEGRAM_BOT_TOKEN;
console.log(bot_token);
const telegramBot = require("telebot");

const bot = new telegramBot("1971799111:AAGg01EJED3-UH2S9kyyL2b7nXQgv7mKiVA");
console.log(bot);
bot.on(["/start", "/hello"], (msg) => msg.reply.text("Welcome!"));

bot.start();
