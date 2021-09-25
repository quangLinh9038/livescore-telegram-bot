require("dotenv").config();
var host = process.env.HOST;
var api_key = process.env.API_KEY;
var bot_token = process.env.TELEGRAM_BOT_TOKEN;

const axios = require("axios").default;
const Bot = require("telebot");
const bot = new Bot(bot_token);
/* 
Generate date
*/
function formatDate(date) {
  var isoDate = new Date(date)
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "")
    .replace(/ (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/, "");
  return isoDate;
}

const today = new Date();

// the next 3 day
var nextDay = new Date(today);
nextDay.setDate(today.getDate() + 3);

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
    "Content-Type": "application/json",
  },
};

const getFixtures = async (options) => {
  try {
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

    return results;
  } catch (err) {
    throw err;
  }
};

const prepareData = async (data) => {
  try {
    const fixture = JSON.stringify(data.fixture);
    return fixture.map((fixture) => `Status: ${fixture.status}`).join(`\n`);
  } catch (error) {
    return error;
  }
};

/* 
Bot
*/
bot.on("/hi", async (msg) => {
  const data = await getFixtures(options);
  const fixture = JSON.stringify(data.fixture);
  console.log(typeof fixture);
  return bot.sendMessage(msg.from.id, JSON.stringify(data));
});

bot.start();
