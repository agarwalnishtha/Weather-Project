const express = require("express");
const https = require("https");
const bodyParser =  require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){ //res is the response our sever gives to the client's browser
  res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req,res){
  console.log(req.body.cityName);
  const city = req.body.cityName;
  const appKey = "7c8954c4fa6e871adda5a6d2957ca5fc";
  // var appKey = config.app_key;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" +appKey+ "&q=" +city+ "&units=" +unit; //this is created as url is very long and
  //thus we were unable to see the beginning and end of the https get method
  https.get(url, function(response){//used reposnse as res is already being used above // response is the response that the external server provide s our server
    //console.log(response); //this will log every information in the console including the path of the url and the status code(200,404etc.)
    console.log(response.statusCode); //will log the status code which will help us in debugging the problems in the request....go to mdn >> http response status codes
    response.on("data",function(data)
    {
      const weatherData = JSON.parse(data);
      //console.log(weatherData);// this will log the data in json format
      const temp = weatherData.main.temp; //this will extract only the temperature data from the json object
      const weatherDescription = weatherData.weather[0].description;
      const cityName = weatherData.name;
      const iconId = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + iconId + "@2x.png"; //this we will get from openweathermap.com>>list of condition codes
      console.log(temp,weatherDescription,cityName,iconId);
      //res.write("<html>");
      res.write("<h1>The temperature in " + cityName + " is " + temp + "° Celcius.</h1>");
      res.write("<h2>The weather desciption is : " + weatherDescription + ".</h2>");
      res.write("<img src = " + iconURL + ">");
      //res.write("</html>");
      res.send();
      //res.send("<h2>The temperature in " + cityName + " is " + temp + "° Celcius.</h2><h2>The weather desciption is : " + weatherDescription + ".</h2>");
    })
  })
})




app.listen(3000, function(){
  console.log("listening to the port 3000");
});
