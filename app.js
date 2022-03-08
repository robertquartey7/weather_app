const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//setting a view engine
app.set('view engine', 'ejs')

//using the static files
app.use(express.static('public'))



//rendering the index page if we go to the home page
app.get("/", (req, res) => {
  res.render('index')
});



//handling post submittions
app.post("/", function (req, res) {
  const query = req.body.city;
  const units = "imperial";
  const apikey = "b42e4e533c8243abb98bff069cfe710b";
  url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apikey}&units=${units}`;

  //fetching data from API
  https.get(url, (response) => {

    //handling the error if the api request is not successful
    if(response.statusCode!=200){
     const errorMsg = 'city not found please try again'

     res.render('error', {errorMsg:errorMsg})

    }else{
      
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon
        const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
  
      
        const content = {
          query:query,
          temp :temp,
          weatherDescription: weatherDescription,
          imgUrl:imgUrl,
        }
  
        res.render('result', content)
  
  
      });
    }
 
  });
});

app.listen(3000, () => console.log("300 running"));
