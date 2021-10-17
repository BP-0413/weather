const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});
app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=74202d21c221054b7de850f19562945f`;

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `In ${weather.name} it's ${weather.main.temp} degree !`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
});
app.listen(3000, function () {
  console.log('Listening on port 3000!');
})
