require("dotenv").config();
var host = process.env.HOST;
var api_key = process.env.API_KEY;
var bot_token = process.env.TELEGRAM_BOT_TOKEN;

const axios = require("axios").default;
const telegramBot = require("telebot");

// const bot = new telegramBot(bot_token);

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

const getFixtures = async (options) => {
  const results = await axios
    .request(options)
    .then((res) => {
      const data = res.data;
      const response = data.response[0];
      return response;
    })
    .catch((err) => {
      return err;
    });

  if (results.length > 0) {
  }
};

// bot.on(["/start", "/hello"], (msg) => {
//   const results = getFixtures();
//   return msg.reply.text(results);
// });

// bot.start();
