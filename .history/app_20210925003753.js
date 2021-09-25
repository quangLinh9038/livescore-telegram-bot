const http = require("https");
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
console.log(path);

const options = {
  method: "GET",
  hostname: "api-football-v1.p.rapidapi.com",
  port: null,
  path: path,
  headers: {
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    "x-rapidapi-key": "21b26dcf34msh40ae0af4853bd02p19e3e6jsnabb618594c7f",
    useQueryString: true,
  },
};

const req = http.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("close", () => {
    const _data = JSON.parse(data);
    const fixtures = _data.response;
    const homeTeam = fixtures.teams.home;
    const awayTeam = fixtures.teams.away;

    const res = {
      fixtures,
      homeTeam,
      awayTeam,
    };
    console.log(res);
  });
});

req.on("error", (err) => {
  console.error(
    `Encountered an error trying to make a request: ${err.message}`
  );
});

req.end();
