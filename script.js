var APIKey = "4af87ee91531ff09b1ce9e3392587b3a"

var startDate = moment().format('M/DD/YYYY');  // Current Date
console.log(startDate)

// 5 day forcast variables
var dayOne = $("#dayOne")
var dayTwo = $("#dayTwo")
var dayThree = $("#dayThree")
var dayFour = $("#dayFour")
var dayFive = $("#dayFive")
var city = "Seattle"

cityWeather()
// On click event listener for search button


function cityWeather() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey,
        method: "GET"

    })
        .then(function (response) {
            console.log(response)
            // converting kelvin to farenheit and adding celcius onto the dashboard.
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            var tempC = (response.main.temp - 273.15);

            // Here we are grabbing all the info for our current city weather deatails and displaying them on our dashboard.
            $(".city").html("<h2>" + response.name + " Weather Details</h2>");
            $(".temp").text("Temp (F): " + tempF.toFixed());
            $(".tempC").html("Temp (C): " + tempC.toFixed())
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".wind").text("Wind: " + response.wind.speed);

            // using iconImg and dynamically creating and image element, then appending it to the weather-icon classs
            var iconImg = $("<img id = 'icon'>")
            $(".weather-icon").append(iconImg)

            // here we are pulling the weather icon from the tree and assigning it to a variable
            var icon = response.weather[0].icon;

            // taking the correct weather icon from our link, turning it into a .png and taking the dynamically created icon ID, and say the attribute we would like to add is the source, and that source is using the iconUrl variable to tell our system where to look.
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            console.log(iconUrl, icon)
            $('#icon').attr('src', iconUrl);

            // This is grabbing the lattitude and longitude
            var myLat = response.coord.lat;
            var myLon = response.coord.lon;
            getUVindex(myLat, myLon);

            // within this fuction we are using the ajax method to grab our UV-Index info. Then we use our console.log to walk the tree of our data from uv index to find the value of lat and lon. This is our displayed UV-Index
            function getUVindex(lat, log) {
                $.ajax({
                    url: `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${log}`,
                    method: "GET",
                    success: function (data) {
                        console.log("data from uv index: ", data);
                        $(".uvIndex").text(`UV index: ${data.value}`);

                        if (data.value < 5) {
                            $(".uvIndex").addClass("Ok")
                        } else if (data.value > 8) {
                            $(".uvIndex").addClass("Severe")
                        } else {
                            $(".uvIndex").addClass("Moderate")
                        }

                    }
                })
            }

        })
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey,
            method: "GET"
        
        }).then(function (fiveDayRes) {
            console.log("5 day no list", fiveDayRes)
            console.log("five day", fiveDayRes.list)
            var fiveDayOnly = []
        
             
            // $(".card-body").text("Humidity: "+fiveDayRes.list[i].main.humidity);
        
        
            for (var i = 0; i < fiveDayRes.list.length; i++) {
        
                var tempF = (fiveDayRes.list[i].main.temp - 273.15) * 1.80 + 32;
               
        
               
                $("#card0Temp").text("Temp (F): " + tempF.toFixed());
                $("#cardOneTemp").text("Temp (F): " + tempF.toFixed());
                $("#cardTwoTemp").text("Temp (F): " + tempF.toFixed());
                $("#cardThreeTemp").text("Temp (F): " + tempF.toFixed());
                $("#cardFourTemp").text("Temp (F): " + tempF.toFixed());
        
                $("#card0Humidity").text("Humidity: " + fiveDayRes.list[i].main.humidity);
                $("#cardOneHumidity").text("Humidity: " + fiveDayRes.list[i].main.humidity);
                $("#cardTwoHumidity").text("Humidity: " + fiveDayRes.list[i].main.humidity);
                $("#cardThreeHumidity").text("Humidity: " + fiveDayRes.list[i].main.humidity);
                $("#cardFourHumidity").text("Humidity: " + fiveDayRes.list[i].main.humidity);
        
        
        
                if (fiveDayRes.list[i].dt_txt.indexOf("12" !== -1)) {
                    console.log(fiveDayRes.list[i].dt_txt.indexOf("12"))
                    fiveDayOnly.push(fiveDayRes.list[i])
                }
            }
            
        })
}




$("#citySearch").on("click", function (event) {
    event.preventDefault();

    city = $("#cityInput").val();
    console.log(city)
    var cityHistory = [];

    cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
    cityHistory.push(city);
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));

    cityWeather()
})
