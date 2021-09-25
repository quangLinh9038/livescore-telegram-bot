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

const formatTimestamp = (timestamp) => {
  var dateTime = new Date(timestamp).toLocaleString();
  return dateTime;
};

const today = new Date();

var fromDate = new Date(today);
fromDate.setDate(today.getDate() - 3);

// the next 3 day
var toDate = new Date(today);
toDate.setDate(today.getDate() + 3);

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
        console.log(data);
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

const prepareData = async (data) => {
  try {
    const { fixture, league, teams, goals } = data;

    const { date, timestamp, status, venue } = fixture;
    const { home, away } = goals;
    console.log(timestamp);
    var _timestamp = formatTimestamp(timestamp);
    var _fixtures = `FIXTURES\n Date: ${formatDate(
      date
    )},\n Time: ${_timestamp},\n Status: ${status.long},\n Stadium: ${
      venue.name
    },\n League: ${league.name}`;

    var _teams = `\n\nHOME: ${teams.home.name} vs AWAY: ${teams.away.name}`;

    var _goals = `\n\nGOALS \n HOME: ${home} - AWAY: ${away}`;

    const results = _fixtures.concat(_teams, _goals);
    return results;
  } catch (error) {
    return error;
  }
};

/*
Bot
*/
bot.on("/real", async (msg) => {
  const data = await getFixtures(options);

  for (const _data in data) {
    console.log(`Fixtures: ${_data}`);
    const fixtures = await prepareData(_data);
    console.log(fixtures);
    return bot.sendMessage(msg.from.id, fixtures);
  }
});

bot.start();
