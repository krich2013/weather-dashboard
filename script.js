var cities = [];
var date = new Date();
var month = date.getMonth()+1;
var day = date.getDate();
var year = date.getFullYear();
var weatherType = "";
var dailyForecast = "";

// Creates AJAX call for the specific movie button being clicked
function displayCityInfo() {
    $("#cities-view").empty();
    var city = $("#city-input").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&apikey=820563b56586bdba74b840ae13ef1180";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var city = $("<h1>").text(response.name);
        var fullDate = $("<div>").text(month + '/' + day + '/' + year);
        var temperatureK = parseInt(response.main.temp);
        var temperatureF = Math.round((temperatureK -273.15)*9/5 + 32);
        var temperature = $("<div>").text("Temperature: " + temperatureF + " °F");
        var humidity = $("<div>").text("Humidity: " + response.main.humidity + "%");
        var windSpeed = $("<div>").text("Wind Speed: " + response.wind.speed + " mph");
        // var uvIndex = $("<div>").text("UV Index: " + response.);
        weatherType = response.weather[0].description;
            selectIcon();

        $("#city-name").empty();
        $("#city-information").empty();

        $("#city-name").append(city);
        $("#city-name").append(fullDate);

        $("#city-information").append(temperature);
        $("#city-information").append(humidity);
        $("#city-information").append(windSpeed);
    });
}

function displayForecast() {
    var city = $("#city-input").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&apikey=820563b56586bdba74b840ae13ef1180";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#five-day").empty();

        for (var i = 1; i<6; i++) {
            day = day + 1;
            fullDateForecast = $("<div>").text(month + '/' + day + '/' + year);
            var temperatureForecastK = parseInt(response.list[i].main.temp);
            var temperatureForecastF = Math.round((temperatureForecastK -273.15)*9/5 + 32);
            var temperatureForecast = $("<div>").text("Temp: " + temperatureForecastF + " °F");
            var humidityForecast = $("<div>").text("Humidity: " +response.list[i].main.humidity + "%");
        
            dailyForecast = $("<div>").attr('class', 'col-md-2 card');

            $("#five-day").append(dailyForecast);
            dailyForecast.append(fullDateForecast);
            dailyForecast.append(temperatureForecast);
            dailyForecast.append(humidityForecast);
        }
    });
}

function selectIcon() {
    // If (weatherType === "clear sky") {
        // var weatherIcon = $("<img/>").attr( 
        //     {id: "weather-icon",
        //     src: "",
        //     height: "",
        //     width: ""
        // });
// }
    // 
}
    
function renderCities() {
    $("#city-searches").empty();

    for (var i = 0; i<cities.length; i++) {
        var cityList = $("<div>");
        cityList.addClass("city-item");
        cityList.attr("data-name", cities[i]);
        cityList.text(cities[i]);

        $("#city-searches").append(cityList);
        displayCityInfo();
        displayForecast();
    }
}

$("#add-city").on("click",function(event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    cities.push(city);
    renderCities();
})
