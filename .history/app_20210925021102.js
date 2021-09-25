require("dotenv").config();
const axios = require("axios").default;
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
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    "x-rapidapi-key": "21b26dcf34msh40ae0af4853bd02p19e3e6jsnabb618594c7f",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

const _data = JSON.parse(data);
const response = _data.response[0];
const { fixture, league, teams, goals, score } = response;

return fixture, league, teams, goals, score;
