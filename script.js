var APIKey = "4af87ee91531ff09b1ce9e3392587b3a"
var weatherUrl ="https://api.openweathermap.org/data/2.5/weather?q=seattle&appid="+APIKey

$.ajax({
    url: weatherUrl,
    method:"GET"
}) 
  .then(function(response){
      console.log(response)

      
  })