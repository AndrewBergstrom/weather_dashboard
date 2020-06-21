var APIKey = "4af87ee91531ff09b1ce9e3392587b3a"
var weatherUrl ="https://api.openweathermap.org/data/2.5/weather?q=seattle&appid="+APIKey

$.ajax({
    url: weatherUrl,
    method:"GET"
}) 
  .then(function(response){
       // Log the queryURL
      console.log(weatherUrl)
    // Log the resulting object
    console.log(response) 

      $(".city").html("<h2>"+response.name + " Weather Details</h2>")
      $(".temp").text("Temp: "+response.main.temp)
      $(".humidity").text("Humidity: "+response.main.humidity)
      $(".wind").text("Wind: " + response.wind.speed)

      
      
  })