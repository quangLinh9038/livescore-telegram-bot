const http = require("https");
const today = new Date();

var nextDay = new Date(today);
nextDay.setDate(today.getDate + 3);

function formatDate(date) {
  const isoDate = date
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "")
    .replace(/ (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/, "");
  return isoDate;
}

const path = `/v3/fixtures?team=541&season=2021&from=${today}&to=${nextDay}`;
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

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toJSON());
  });
});

req.end();
