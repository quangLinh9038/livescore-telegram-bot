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
const formatDate = (date) => {
  var isoDate = new Date(date)
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "")
    .replace(/ (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/, "");
  return isoDate;
};

const formatISOTimestamp = (ts) => {
  const milliseconds = 1000;
  var timestamp = new Date(ts * milliseconds).toString();
  return timestamp;
};

const today = new Date();

// the previous 3 days
var fromDate = new Date(today);
fromDate.setDate(today.getDate() - 3);

// the next 3 days
var toDate = new Date(today);
toDate.setDate(today.getDate() + 3);

/* 
 Request options
*/
var options = {
  method: "GET",
  url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
  params: {
    season: "2021",
    team: "541",
    from: formatDate(fromDate),
    to: formatDate(toDate),
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
        const response = data.response;
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

/* 
Preparing each fixture with readable format
*/
const prepareData = async (data) => {
  try {
    const { fixture, league, teams, goals } = data;
    const { timestamp, status, venue } = fixture;
    const { home, away } = goals;

    var _timestamp = formatISOTimestamp(timestamp);

    var _fixtures = `FIXTURES\n Date: ${_timestamp},\n Status: ${status.long},\n Stadium: ${venue.name},\n League: ${league.name}`;

    var _teams = `\n\nHOME: ${teams.home.name} vs AWAY: ${teams.away.name}`;

    var _goals = `\n\nGOALS \n HOME: ${home} - AWAY: ${away} \n\n\n`;

    const results = _fixtures.concat(_teams, _goals);
    return results;
  } catch (error) {
    return error;
  }
};

/*
Telegram Bot
*/
bot.on("/real", async (msg) => {
  var results = ``;
  const data = await getFixtures(options);
  for (const _data of data) {
    const fixtures = await prepareData(_data);
    results += fixtures;
  }
  return bot.sendMessage(msg.from.id, results);
});

bot.start();
