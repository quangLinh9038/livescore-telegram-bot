require("dotenv").config();
const axios = require("axios");
var host = process.env.HOST;
var api_key = process.env.API_KEY;
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

const path = `/v3/fixtures?team=541&season=2021&from=${formatDate(
  today
)}&to=${formatDate(nextDay)}`;

const options = {
  method: "GET",
  hostname: host,
  port: null,
  path: path,
  headers: {
    "x-rapidapi-host": host,
    "x-rapidapi-key": api_key,
    useQueryString: true,
  },
};

const _data = JSON.parse(data);
const response = _data.response[0];
const { fixture, league, teams, goals, score } = response;

return fixture, league, teams, goals, score;
