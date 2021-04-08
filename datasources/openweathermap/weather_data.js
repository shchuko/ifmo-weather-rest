const WeatherDataTemplate = require("../templates/weather-data-template");

class OpenWeatherMapWeatherData extends WeatherDataTemplate {
    constructor(response) {
        super();

        let data = new WeatherDataTemplate();
        data.name = response.name;
        data.temperature = Math.round(response.main.temp);
        data.iconSrc = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
        data.windSpeed = response.wind.speed;
        data.windDirection = WeatherDataTemplate.convertWindDirection(response.wind.deg);
        // Set to Upper first character of 'cloudiness'
        data.cloudiness = response.weather[0].description.charAt(0).toUpperCase()
            + response.weather[0].description.slice(1);
        data.pressure = response.main.pressure;
        data.humidity = response.main.humidity;
        data.locationLat = response.coord.lat;
        data.locationLon = response.coord.lon;

        return data;
    }
}

module.exports = OpenWeatherMapWeatherData;