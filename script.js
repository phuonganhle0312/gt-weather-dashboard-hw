//declared variables
const apikey= "a8ffefde4c3d97d26c0c126fb6117891";
let city="";
//2 API calls
function APIcalls(){
        //retrieve current weather and forecast data
        let forecastUrl= "https://api.openweathermap.org/data/2.5/forecast?q="; 
        let currentUrl="https://api.openweathermap.org/data/2.5/weather?q=";
        let uvUrl="api.openweathermap.org/data/2.5/uvi?appid=" + apikey + "&lat="+ lat + "&lon="+ long;
        queryurl = forecastUrl + city + apikey;
        currentWeatherUrl = currentUrl + city + apikey;
        
        //CURRENT WEATHER
        $.ajax({
            url: currentWeatherURL,
            method: "GET",
        })
        
        .then(function(response) {
            let icon = response.weather[0].icon;
            let iconurl= "http://openweathermap.org/img/w/" + icon + ".png";
            $("#cityName").text(response.name);
            $(".temperature").text("Temperature: " + ((response.main.temp - 273.15) * 1.8 + 32).toFixed(0) + " °F");
            $(".humidity").text("Humidity: " + response.main.humidity + " %");
            $(".windspeed").text("Wind Speed: " + response.wind.speed + " MPH");
            $("#icon").attr("src",iconurl);
            //UV index
            
            $.ajax({
                url: uvUrl,
                method: "GET"
            })
            .then(function(responseTwo){
                $(".uvIndex").text("UV Index :" + responseTwo.uv.index);
            
            })
            //Retrieve 5 day forecast data
            $.ajax({
                url:forecastUrl,
                method: "GET"
            })
            .then(function(responseThree){
                //icon data for forecats
                let icon1= responseThree.list[4].weather[0].icon;
                let icon1url= "http://openweathermap.org/img/w/" + icon1 + ".png";

                let icon2= responseThree.list[4].weather[0].icon;
                let icon2url= "http://openweathermap.org/img/w/" + icon2 + ".png";

                let icon3= responseThree.list[4].weather[0].icon;
                let icon3url= "http://openweathermap.org/img/w/" + icon3 + ".png";

                let icon4= responseThree.list[4].weather[0].icon;
                let icon4url= "http://openweathermap.org/img/w/" + icon4 + ".png";

                let icon5= responseThree.list[4].weather[0].icon;
                let icon5url= "http://openweathermap.org/img/w/" + icon5 + ".png";

            })
        });
    
    };
    
    APIcalls ();
    console.log(APIcalls)
