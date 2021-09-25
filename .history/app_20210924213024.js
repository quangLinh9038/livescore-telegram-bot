var request = require("request");

var options = {
  method: "GET",
  url: "https://v3.football.api-sports.io/countries",
  headers: {
    "x-rapidapi-host": "v3.football.api-sports.io",
    "x-rapidapi-key": "XxXxXxXxXxXxXxXxXxXxXxXx",
  },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
