var APIKey = "4af87ee91531ff09b1ce9e3392587b3a"

var startDate = moment().format('M/DD/YYYY');  // Current Date
console.log(startDate)

var city = "Captain Cook"

cityWeather()

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

            $(".city").html("<h4>" + response.name + ` Weather Details ${startDate}</h4>`);
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
                            $(".uvIndex").addClass("ok")
                        } if (data.value > 8) {
                            $(".uvIndex").addClass("severe")
                        } else {
                            $(".uvIndex").addClass("moderate")
                        }

                    }
                })
            }

        })
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial",
        method: "GET"

    }).then(function (fiveDayRes) {
       
     var fiveDayOnly = []

        for (var i = 0; i < fiveDayRes.list.length; i++) {
            if (fiveDayRes.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                console.log(fiveDayRes.list[i])
                fiveDayOnly.push(fiveDayRes.list[i])

                var tempF = (fiveDayRes.list[i].main.temp - 273.15) * 1.80 + 32;
                var myTemp = fiveDayRes.list[i].dt_txt.split(" ")

                var myCard = `<div class="card bg-light text-black" id="cardZero">
                <div class="card-body">
                  <h5 class="card-title" id="card0Date">${myTemp[0]}</h5>
                    <img id="card0Img" src="" alt="">
                    <p class="card-text" id="card0Temp">Temp : ${fiveDayRes.list[i].main.temp.toFixed()}</p>
                    <p class="card-text" id="card0Humidity">Humidity : ${fiveDayRes.list[i].main.humidity}</p>
                </div>
              </div>`

              $(".card-deck").append(myCard)

            }
           
        }
   

    })
}


$("#citySearch").on("click", function (event) {
    event.preventDefault();
    $(".card-deck").text("")
    city = $("#cityInput").val();
    $("#cityInput").val("")
    console.log(city)
    var cityHistory = [];

    cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
    cityHistory.push(city);
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));

    cityWeather()
})
