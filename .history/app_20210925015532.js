require("dotenv").config();
const http = require("https");
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

const req = http.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("close", () => {
    const _data = JSON.parse(data);
    const response = _data.response[0];
    const { fixture, league, teams, goals, score } = response;
    // console.log(fixture, league, teams, goals, score);
  });
});

req.on("error", (err) => {
  console.error(
    `Encountered an error trying to make a request: ${err.message}`
  );
});

req.end();

const fetchImages = async (text) => {
  try {
    const {
      data: { photos },
    } = await axios
      .get(
        `https://api.pexels.com/v1/search?query=${encodeURI(text)}&per_page=10`,
        {
          headers: { Authorization: pexelKey },
        }
      )
      .catch(() => []);
    if (photos.length > 0) {
      return photos.map(({ src }) => ({
        media: src?.landscape,
        caption: "Pexel",
        type: "photo",
      }));
    } else {
      const {
        data: { results },
      } = await axios.get(
        `https://api.unsplash.com/search/photos?query=${encodeURI(text)}`,
        {
          headers: { Authorization: `Client-ID ${unsplashKey}` },
        }
      );
      return results.map(({ urls }) => ({
        media: urls?.regular,
        caption: "Unsplash",
        type: "photo",
      }));
    }
  } catch (e) {
    throw e;
  }
};
