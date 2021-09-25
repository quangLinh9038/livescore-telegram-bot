var request = require("request");

var options = {
  method: "GET",
  url: "https://v3.football.api-sports.io/leagues",
  headers: {
    "x-rapidapi-host": "v3.football.api-sports.io",
    "x-rapidapi-key": "21b26dcf34msh40ae0af4853bd02p19e3e6jsnabb618594c7f",
  },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
