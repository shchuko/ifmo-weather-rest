class WeatherDataTemplate {
    name;
    temperature;
    iconSrc;
    windSpeed;
    windDirection;
    cloudiness;
    pressure;
    humidity;
    locationLat;
    locationLon;

    static convertWindDirection(deg) {
        if (deg > 337.5) {
            return "N";
        }
        if (deg > 292.5) {
            return "NW";
        }
        if (deg > 247.5) {
            return "W";
        }
        if (deg > 202.5) {
            return "SW";
        }
        if (deg > 157.5) {
            return "S";
        }
        if (deg > 122.5) {
            return "SE";
        }
        if (deg > 67.5) {
            return "E";
        }
        if (deg > 22.5) {
            return "NE";
        }
        return "N";
    }
}

module.exports = WeatherDataTemplate;