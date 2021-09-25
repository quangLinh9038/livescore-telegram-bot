const request = require("request");

const options = {
  method: "GET",
  url: "https://api-football-v1.p.rapidapi.com/v3/leagues",
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
