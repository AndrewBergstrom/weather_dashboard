var APIKey = "4af87ee91531ff09b1ce9e3392587b3a"
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=" + APIKey

// 5 day forcast variables
var dayOne = $("#dayOne")
var dayTwo = $("#dayTwo")
var dayThree = $("#dayThree")
var dayFour = $("#dayFour")
var dayFive = $("#dayFive")

$.ajax({
    url: weatherUrl,
    method: "GET"
})
    .then(function (response) {
        // Log the queryURL
        console.log(weatherUrl)
        // Log the resulting object
        console.log(response)

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var tempC = (response.main.temp - 273.15);

        $(".city").html("<h2>" + response.name + " Weather Details</h2>");
        $(".temp").text("Temp (F): " + tempF.toFixed());
        $(".tempC").html("Temp (C): " + tempC.toFixed())
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".wind").text("Wind: " + response.wind.speed);
       
        var iconImg = $("<img id = 'icon'>")
        $(".weather-icon").append(iconImg)

        var icon = response.weather[0].icon;

        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            $('#icon').attr('src', iconUrl);

        var myLat = response.coord.lat;
        var myLon = response.coord.lon;
        getUVindex(myLat, myLon);




        function getUVindex(lat, log) {
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${log}`,
                method: "GET",
                success: function (data) {
                    // console.log("data from uv index: ", data);
                    $(".uvIndex").text(`UV index: ${data.value}`);
                }
            })
        }

    })













//On click event listener for search button
// $("#run-search").on("click", function () {
//     city = $("#search-term").val()
//     displayWeather()
//     display5day()
// })

//On click event listener for city buttons
// $(document).on("click", ".city-btn", function () {
//     city = $(this).attr("data-name");
//     displayWeather()
//     display5day()
// })

//On click event listener for clear search results button
// $("#clear-search").on("click", function () {
//     localStorage.clear("cities")
//     listOfCities = []
//     $(".buttons-view").empty()
//     //refresh page
//     location.reload()
// })

   //To run when document loads (if/else statement that will pull from local storage only if the value is not "null")
// $(document).ready(function() {
//     if(localStorage.getItem("cities") !== null) {
//         var savedCity = localStorage.getItem("cities");
//         var pushCities = JSON.parse(savedCity)
//         listOfCities = listOfCities.concat(pushCities)
//     }

//     renderButtons()
//     })
