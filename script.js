var cities = [];
var date = new Date();
var month = date.getMonth()+1;
var day = date.getDate();
var year = date.getFullYear();
var weatherType = "";
var dailyForecast = "";
city = "";
cityClicked = "";
lat ="";
lon="";
uvIndex = "";


init();

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    
    // If cities were retrieved from localStorage, update the cities array to reflect the retrieved cities
    if (storedCities !== null) {
        cities = storedCities;
    }
}
// Render cities to the DOM
renderCities();

// Display the main city information
function displayCityInfo() {
    $("#cities-view").empty();
    city = $("#city-input").val().trim();

// Check to see if the city has been placed in the input field or clicked
    if (city === ""&& cityClicked === ""){
        return
    }

    else if (city === ""){
        city = cityClicked
    }


    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&apikey=820563b56586bdba74b840ae13ef1180";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var cityDate = $("<h1>").text(response.name + " (" + month + '/' + day + '/' + year+ ")");
        var cityIcon = $("<img/>").attr( 
            {id: "weather-icon",
            src: "http://openweathermap.org/img/wn/" + response.weather[0].icon +"@2x.png",
            height: "65px",
            width: "65px"
        });
        var temperatureK = parseInt(response.main.temp);
        var temperatureF = Math.round((temperatureK -273.15)*9/5 + 32);
        var temperature = $("<div>").text("Temperature: " + temperatureF + " °F");
        var humidity = $("<div>").text("Humidity: " + response.main.humidity + "%");
        var windSpeed = $("<div>").text("Wind Speed: " + response.wind.speed + " mph");
        lat = response.coord.lat;
        lon = response.coord.lon;
        weatherType = response.weather[0].description;
        
        $("#city-name").empty();
        $("#city-information").empty();
        
        $("#city-name").append(cityDate);
        cityDate.append(cityIcon);
        
        $("#city-information").append(temperature);
        $("#city-information").append(humidity);
        $("#city-information").append(windSpeed);
        displayUVInfo();
    });
}

function displayUVInfo() {
    var queryDate = Math.round((new Date()).getTime() / 1000);
    console.log(queryDate);
    var queryURL1 = "http://api.openweathermap.org/data/2.5/uvi/history?appid=820563b56586bdba74b840ae13ef1180&lat="+lat+"&lon="+lon+"&cnt=1&start="+queryDate+"&end="+queryDate;
    
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        uvIndex = response[0].value;
        var uvIndexContent = $("<div>").text("UV Index: " + uvIndex);
        $("#city-information").append(uvIndexContent);
    })
}

// Display the 5 day forecast
function displayForecast() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&apikey=820563b56586bdba74b840ae13ef1180";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#five-day").empty();
        
        for (var i=0; i < 5; i++) {
            city = $("#city-input").val().trim();
            
            // Check to see if the city has been placed in the input field or clicked
            if (city === "" && cityClicked === ""){
                return
            }

            else if (city === ""){
                city = cityClicked
            }

            day = day + 1;
            fullDateForecast = $("<h4>").text(month + '/' + day + '/' + year);
            var temperatureForecastK = parseInt(response.list[i].main.temp);
            var temperatureForecastF = Math.round((temperatureForecastK -273.15)*9/5 + 32);
            var temperatureForecast = $("<div>").text("Temp: " + temperatureForecastF + " °F");
            var humidityForecast = $("<div>").text("Humidity: " +response.list[i].main.humidity + "%");
            var weatherIcon = $("<img/>").attr( 
                    {id: "weather-icon",
                    src: "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon +"@2x.png",
                    height: "50px",
                    width: "50px"
                });
        
            dailyForecast = $("<div>").attr('class', 'col-md-2 card');

            $("#five-day").append(dailyForecast);
            dailyForecast.append(fullDateForecast);
            dailyForecast.append(weatherIcon);
            dailyForecast.append(temperatureForecast);
            dailyForecast.append(humidityForecast);
            }
            clearInput();
        });
    }
    
// Clear the user input and the dates
function clearInput() {
    $("#city-input").val("");
    day = date.getDate();
}

// Store the search history to local storage
function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

// Render past searches
function renderCities() {
    $("#city-searches").empty();

    for (var i = 0; i<cities.length; i++) {
        var cityList = $("<div>");
        cityList.addClass("city-item");
        cityList.attr("data-name", cities[i]);
        cityList.text(cities[i]);

        $("#city-searches").prepend(cityList);
    }
}

// Clicking the search history field
$(document).on("click", ".city-item", function(event){
    event.preventDefault;
    cityClicked = $(this).attr("data-name");
    displayUVInfo();
    displayCityInfo();
    displayForecast();
});

// Inputting a value and clicking the search button
$("#add-city").on("click",function(event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    cities.push(city);
    storeCities();
    renderCities();
    displayUVInfo();
    displayCityInfo();
    displayForecast();
})
