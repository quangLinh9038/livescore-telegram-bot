const request = require("request");
const express = require("express");

const options = {
  method: "GET",
  url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
  qs: { date: "2021-09-25", league: "140", season: "2021", team: "541" },
  headers: {
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    "x-rapidapi-key": "21b26dcf34msh40ae0af4853bd02p19e3e6jsnabb618594c7f",
    useQueryString: true,
  },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
