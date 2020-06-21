var APIKey = "4af87ee91531ff09b1ce9e3392587b3a"
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=" + APIKey



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

         var myLat = response.coord.lat;
         var myLon = response.coord.lon;
        getUVindex(myLat, myLon);
        
  
    })

    function getUVindex(lat, log){
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${log}`,
            dataType: "json",
            success: function(data){
                console.log("data from uv index: ", data);
                $(".uvIndex").text(`UV index: ${data.value}`);
            }
        })
    }