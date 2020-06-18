$(document).ready(function () { // declared variables
    const apikey = "a8ffefde4c3d97d26c0c126fb6117891";
    const searchInput = $("#searchInput");
    const city= searchInput.val().trim();
    current();
    console.log(current)
    // API calls
    function current() {
        navigator.geolocation.getCurrentPosition(function (position) {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // retrieve current weather
            let currentWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + apikey;

            // CURRENT WEATHER
            $.ajax({url: currentWeather, method: "GET"}).then(function (response) {
                let icon = response.weather[0].icon;
                let iconurl = "https://openweathermap.org/img/w/" + icon + ".png";
                $("#cityName").text(response.name);
                $(".temperature").text("Temperature: " + (
                    (response.main.temp - 273.15) * 1.8 + 32
                ).toFixed(0) + " °F");
                $(".humidity").text("Humidity: " + response.main.humidity + " %");
                $(".windspeed").text("Wind Speed: " + response.wind.speed + " MPH");
                $("#icon").attr("src", iconurl);
            });
            // UV index
            uv();
            function uv() {

                let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apikey + "&lat=" + lat + "&lon=" + long;
                $.ajax({url: uvUrl, method: "GET"}).then(function (responseTwo) {
                    $(".uvIndex").text("UV Index :" + responseTwo.uv.index);

                })
            };

            // Onclick Value
            let citySearch = [];
            function getSearch() {
                let getCity = localStorage.getItem("citySearch");
                console.log(getCity);
            }
            $("#searchBtn").on("click", function (event) {
                event.preventDefault();
                let input = $("#searchInput");
                let city = input.val().trim();
                citySearch.push(city)

                function storeSearch() {
                    localStorage.setItem("citySearch", JSON.stringify(citySearch));
                }
                if (city === null || city === "") {
                    alert("Invalid Input");
                } else {
                    renderSearch();
                    storeSearch();
                    getSearch();
                }
                function renderSearch() {
                    $(".searchData").prepend("<p>" + city + "</p>")
                }
               

            });
            forecast();
            // 5 DAY FORECAST
            function forecast() {
                let queryurl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apikey;

                // Retrieve 5 day forecast data
                $.ajax({url: queryurl, method: "GET"}).then(function (responseThree) { 
                    console.log(queryurl)
                    console.log(responseThree)

                    // icon data for forecats
                    let icon1 = responseThree.list[4].weather[0].icon;
                    let icon1url = "https://openweathermap.org/img/w/" + icon1 + ".png";

                    let icon2 = responseThree.list[4].weather[0].icon;
                    let icon2url = "https://openweathermap.org/img/w/" + icon2 + ".png";

                    let icon3 = responseThree.list[4].weather[0].icon;
                    let icon3url = "https://openweathermap.org/img/w/" + icon3 + ".png";

                    let icon4 = responseThree.list[4].weather[0].icon;
                    let icon4url = "https://openweathermap.org/img/w/" + icon4 + ".png";

                    let icon5 = responseThree.list[4].weather[0].icon;
                    let icon5url = "https:/www/openweathermap.org/img/w/" + icon5 + ".png";

                    // temperature conversion by kevlin
                    let temp1C = (responseThree.list[4].main.temp - 273.15) * 9 / 5 + 32;
                    let temp1 = temp1C.toFixed(1);

                    let temp2C = (responseThree.list[12].main.temp - 273.15) * 9 / 5 + 32;
                    let temp2 = temp2C.toFixed(1);

                    let temp3C = (responseThree.list[20].main.temp - 273.15) * 9 / 5 + 32;
                    let temp3 = temp3C.toFixed(1);

                    let temp4C = (responseThree.list[28].main.temp - 273.15) * 9 / 5 + 32;
                    let temp4 = temp4C.toFixed(1);

                    let temp5C = (responseThree.list[36].main.temp - 273.15) * 9 / 5 + 32;
                    let temp5 = temp5C.toFixed(1);

                    let dayOne = responseThree.list[4].dt_txt;
                    let dayTwo = responseThree.list[12].dt_txt;
                    let dayThree = responseThree.list[20].dt_txt;
                    let dayFour = responseThree.list[28].dt_txt;
                    let dayFive = responseThree.list[36].dt_txt;

                    console.log(responseThree.list[4].dt_txt)

                    // extract part of string & append data
                    $("#day1").html("<h4>" + dayOne.substr(0, 10) + "</h4>")
                    $("#day1").append("<img src=" + icon1url + ">");
                    $("#day1").append("<p>" + "Temperature" + temp1 + "°F </p>");
                    $("#day1").append("<p>" + "Humidity: " + responseThree.list[4].main.humidity + "%</p>");

                    $("#day2").html("<h4>" + dayTwo.substr(0, 10) + "</h4>")
                    $("#day2").append("<img src=" + icon2url + ">");
                    $("#day2").append("<p>" + "Temperature" + temp2 + "°F </p>");
                    $("#day2").append("<p>" + "Humidity: " + responseThree.list[12].main.humidity + "%</p>");

                    $("#day3").html("<h4>" + dayThree.substr(0, 10) + "</h4>")
                    $("#day3").append("<img src=" + icon3url + ">");
                    $("#day3").append("<p>" + "Temperature" + temp3 + "°F </p>");
                    $("#day3").append("<p>" + "Humidity: " + responseThree.list[20].main.humidity + "%</p>");

                    $("#day4").html("<h4>" + dayFour.substr(0, 10) + "</h4>")
                    $("#day4").append("<img src=" + icon4url + ">");
                    $("#day4").append("<p>" + "Temperature" + temp4 + "°F </p>");
                    $("#day4").append("<p>" + "Humidity: " + responseThree.list[28].main.humidity + "%</p>");

                    $("#day5").html("<h4>" + dayFive.substr(0, 10) + "</h4>")
                    $("#day5").append("<img src=" + icon5url + ">");
                    $("#day5").append("<p>" + "Temperature" + temp5 + "°F </p>");
                    $("#day5").append("<p>" + "Humidity: " + responseThree.list[36].main.humidity + "%</p>");


                });
            };
        });


    }
});
