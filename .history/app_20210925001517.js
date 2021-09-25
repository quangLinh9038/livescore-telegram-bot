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

const req = http.get(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("close", () => {
    // const body = Buffer.concat(chunks);
    console.log(JSON.parse(data));
  });
});

req.end();
