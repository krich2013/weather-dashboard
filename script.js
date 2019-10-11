var cities = [];

// Creates AJAX call for the specific movie button being clicked
function displayCityInfo() {
    $("#cities-view").empty();
    var city = $(this).attr("data-name");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&apikey=820563b56586bdba74b840ae13ef1180";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // var city = $("<div>").text("Rated: " + response.Rated);
        // var date = $("<div>").text("Released: " + response.Released);
        // var iconImage = $("<img/>").attr( 
            //     {id: "movie-image",
            //     src: response.Poster});
            // var temperature = 
            // var humidity = 
            // var windSpeed = 
            // var uvIndex = 
        });
    }
    
    function renderCities() {
        $("#city-searches").empty();

        for (var i = 0; i<cities.length; i++) {
            var cityList = $("<div>");
            cityList.addClass("city-item");
            cityList.attr("data-name", cities[i]);
            cityList.text(cities[i]);

            ("#city-searches").append(cityList);
        }
    }

    $("#add-city").on("click",function(event) {
        event.preventDefault();
        var city = $("#city-input").val().trim();
        cities.push(city);
        renderCities();
})
