require("dotenv").config();
var host = process.env.HOST;
var api_key = process.env.API_KEY;
var bot_token = process.env.TELEGRAM_BOT_TOKEN;

const axios = require("axios").default;
const telegramBot = require("telebot");

const bot = new telegramBot(bot_token);

/* 
Generate date
*/
const today = new Date();
var nextDay = new Date(today);
nextDay.setDate(today.getDate() + 3);

function formatDate(date) {
  var isoDate = new Date(date)
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "")
    .replace(/ (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/, "");
  return isoDate;
}

var options = {
  method: "GET",
  url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
  params: {
    season: "2021",
    team: "541",
    from: formatDate(today),
    to: formatDate(nextDay),
  },
  headers: {
    "x-rapidapi-host": host,
    "x-rapidapi-key": api_key,
  },
};

const getFixtures = async () => {
  const results = axios
    .request(options)
    .then((res) => {
      const data = res.data;
      const response = data.response[0];
      return response;
    })
    .catch(function (error) {
      console.error(error);
    });

  return results;
};

const info = getFixtures();
console.log(info);

bot.on(["/start", "/hello"], (msg) => msg.reply.text("hi"));

bot.start();
