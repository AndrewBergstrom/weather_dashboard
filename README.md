# weather_dashboard# 06 Server-Side APIs: Weather Dashboard

Using the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities I was able to create a functioning weather dashboard. My weather dashboard utilizes many different parts of information that is retrieved by the OpenWeather API. Some of the parts include:

    * A form input for the user to search weather conditions in any city.
    * After entering your city of choice, click the search button and the city you chose will populate
    * The city of choice will populate to the right of the search filed and display in-depth one day weather info.
    * Using the OpenWeather API I was able to pull and didsplay Temperature, Humidity, Wind, and the UV Index for the day. 
    * I was able to assign a color to my UV Index and the color is supposed to change depending on the severity of the UV index.
    * At the bottom of my dashboard there is a future forecast that displays the following 5 days.
    * I was able to use a for loop to display each day in succession, along with that days corresponding data, which includes: Date, Temperature, and Humidity.
    * When the Enter city input field is clicked, a history of cities searched populates. You can then select that city, enter seach and then that city displays.

I ran into a couple problems with this project. 
    
    1) The UV index was a big challenge, and ultimitly I had to make this a seperate ajax call using the latitude and longitude in the url. Then I had to display the Data.Value which was the uv index of the city that had been searched. After gathering that information I was able to use jquery to grab the UV-index class from html, then I used .text to display the data.value (UV Index).

    2) My second biggest challenge was getting the 5 day forecast to populate the correct date, that days temperature and humidity. Initially I thought using 5 different variables corresponding with it's own class could work. I built 5 seperate cards from bootstrap, added a class in each one so that I could assign a variable to that individual card. This proved to be a little too complicated so I switched gears and dynamically created each card using a for loop. Within this for loop I was then able to pull to data out of the OpenWeather API and apply the correct date, temperature, and humidity. 

Overall a challenging exercise but really good practice using API's.


