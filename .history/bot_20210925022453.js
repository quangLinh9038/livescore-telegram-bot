require("dotenv").config();
var bot_token = process.env.TELEGRAM_BOT_TOKEN;

const getFixtures = require("./app");
const telegramBot = require("telebot");

const bot = new telegramBot(bot_token);

const text = getFixtures;
console.log(text);
bot.on(["/start", "/hello"], (msg) => msg.reply.text(text));

bot.start();
