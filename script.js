$(document).ready(function () {
    var now = moment().format("MM/DD/YYYY");
    var cities = [];


    cities = JSON.parse(localStorage.getItem("cities"))
    if (!cities) {
        cities = [];
    }

    for (var i = 0; i < cities.length; i++) {
        
        var previouscities = $("<p>").text(cities[i])

        $(".prev-search").append(previouscities);
    }

    function weathertime() {
        event.preventDefault();
        $(".current-weather").empty();

        var APIKey = "a1bad58229d39d8903f9b535591f8f5e";
        var city = $("#input")[0].value;

        cities.push(city)
        
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


            $("#city-date").text(response.name + " Weather Details " + "(" + now + ")");
            $(".wind").text("Wind Speed: " + response.wind.speed + "mph");
            $(".humidity").text("Humidity: " + response.main.humidity + "%");
            $(".temp").text("Temperature: " + response.main.temp + "°F");


            var weatherIcon = response.weather[0].icon;

            var weatherImgSrc = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"

            var weatherImg = $('<img>');
            weatherImg.attr('src', weatherImgSrc);
            $('#weather-image').append(weatherImg);
            $("#weather-img img").attr("src", weatherImgSrc);


            var lat = response.coord.lat;
            var lon = response.coord.lon;

            var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + lat + "&lon=" + lon + ""

            $.ajax({
                url: queryURL2,
                method: "GET"

            }).then(function (response) {

                var uvindex = response.value;

                $(".uv-index").text("UV Index: " + uvindex)




            })

        })


        var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
        $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function (response) {


            for (let i = 0; i < response.list.length; i++) {

                if (response.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                    var forecastdate = response.list[i].dt_txt;
                    var newDate = forecastdate.split('', 10).join('');

                    var weatherIcon = response.list[i].weather[0].icon;
                    var forecasttemp = Math.floor(response.list[i].main.temp);
                    var forecasthumidity = response.list[i].main.humidity;

                    var forecastCard = `<div class="col"><div class="card bg-primary text-white" style="width: 15rem;">
                                          <div class="card-body">
                                              <h5 class="card-title">${newDate}</h5>
                                              <img src="http://openweathermap.org/img/wn/${weatherIcon}.png"  alt="...">
                                              <p class="card-text">Temp: ${forecasttemp}°F</p>
                                              <p class="card-text">Humidity: ${forecasthumidity}%</p>
                                          </div>
                                          </div>
                                          </div>`


                    $("#forecast-area").append(forecastCard)
                }
            }

        })

        setStorage();


    }

    function previousweather() {
        event.preventDefault();
        $(".current-weather").empty();

        var city = event.target.textContent;
        var APIKey = "a1bad58229d39d8903f9b535591f8f5e";
       

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


            $("#city-date").text(response.name + " Weather Details " + "(" + now + ")");
            $(".wind").text("Wind Speed: " + response.wind.speed + "mph");
            $(".humidity").text("Humidity: " + response.main.humidity + "%");
            $(".temp").text("Temperature: " + response.main.temp + "°F");


            var weatherIcon = response.weather[0].icon;

            var weatherImgSrc = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"

            var weatherImg = $('<img>');
            weatherImg.attr('src', weatherImgSrc);
            $('#weather-image').append(weatherImg);
            $("#weather-img img").attr("src", weatherImgSrc);


            var lat = response.coord.lat;
            var lon = response.coord.lon;

            var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + lat + "&lon=" + lon + ""

            $.ajax({
                url: queryURL2,
                method: "GET"

            }).then(function (response) {

                var uvindex = response.value;

                $(".uv-index").text("UV Index: " + uvindex)




            })

        })


        var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
        $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function (response) {


            for (let i = 0; i < response.list.length; i++) {

                if (response.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                    var forecastdate = response.list[i].dt_txt;
                    var newDate = forecastdate.split('', 10).join('');

                    var weatherIcon = response.list[i].weather[0].icon;
                    var forecasttemp = Math.floor(response.list[i].main.temp);
                    var forecasthumidity = response.list[i].main.humidity;

                    var forecastCard = `<div class="col"><div class="card bg-primary text-white" style="width: 15rem;">
                                          <div class="card-body">
                                              <h5 class="card-title">${newDate}</h5>
                                              <img src="http://openweathermap.org/img/wn/${weatherIcon}.png"  alt="...">
                                              <p class="card-text">Temp: ${forecasttemp}°F</p>
                                              <p class="card-text">Humidity: ${forecasthumidity}%</p>
                                          </div>
                                          </div>
                                          </div>`


                    $("#forecast-area").append(forecastCard)
                }
            }

        })

        setStorage();


    }

    function setStorage() {
        localStorage.setItem("cities", JSON.stringify(cities))
  
    }

    $(".btn").click(weathertime)
    $(".prev-search").click(previousweather)
})