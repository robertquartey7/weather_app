const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.city;
  const units = "imperial";
  const apikey = "b42e4e533c8243abb98bff069cfe710b";
  url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apikey}&units=${units}`;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      console.log(`${temp} ${weatherDescription}`);
    });
  });
});

app.listen(3000, () => console.log("300 running"));
