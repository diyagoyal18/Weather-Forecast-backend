const express = require("express");
const https = require("https");
const baodyParser = require("body-parser");
const app= express();

app.use(baodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+ "/index.html");
  // res.send("server running properly")
});

app.post("/",function(req,res){
  // console.log("req received");
  // console.log(query);
    const query = req.body.cityname;
    const apiKey = "3c96df7053dc23e64b51cf8ab018c4a5"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+""
    https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data", function(data){
        console.log(data);
      // const weatherData=  JSON.parse(data);
      // console.log(weatherData);
      const weatherData= JSON.parse(data)
      const temp = weatherData.main.temp;
      console.log(temp);
      const icon = weatherData.weather[0].icon;
      const imageURL= "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<h1>the temperature in ludhiana is "+ temp+"</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    });
  });

})






app.listen(3000, function(){
  console.log("server started");
})
