//API key
const apikey= "a8ffefde4c3d97d26c0c126fb6117891";
//retrieve longitude latitude for current weather
function currentWeather(){
    navigator.geolocation.getCurrentPosition(function(position){
        long=position.coords.longitude;
        lat=position.coords.latitude;

        let queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" +  apikey;

        $.ajax({
            url: queryURL,
            method: GET
        })
        //store data in response
        .then(function(response){
            let icon = response.weather[0].icon;
            let iconurl= "http://openweathermap.org/img/w/" + icon + ".png";
            $("#cityName").text(response.name);
            $(".temperature").text("Temperature: " + ((response.main.temp - 273.15) * 1.8 + 32).toFixed(0) + " °F");
            $(".humidity").text("Humidity: " + response.main.humidity + " %");
            $(".windspeed").text("Wind Speed: " + response.wind.speed + " MPH");
            $("#icon").attr("src",iconurl);
            //repear with UV index
            let queryURL="api.openweathermap.org/data/2.5/uvi?appid=" + apikey + "&lat="+ lat + "&lon="+ long;
            $.ajax({
                url: queryURL,
                method: GET
            })
            .then(function(response){
                $(".uvIndex").text("UV Index :" + response.uv.index);

            }
            )}
        )}
    )};
    currentWeather ();
    console.log(currentWeather)
