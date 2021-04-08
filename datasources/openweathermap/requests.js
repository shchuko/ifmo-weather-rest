const fetch = require("node-fetch");
const OpenWeatherMapWeatherData = require("./weather_data");
const config = require("./config");

async function requestWeatherInfo(params) {
    const url = new URL(config.url);
    url.searchParams.append("appid", config.apiKey);
    url.searchParams.append("units", "metric");

    for (const param in params) {
        if (params.hasOwnProperty(param)) {
            url.searchParams.append(param, params[param]);
        }
    }

    let response = await fetch(url);
    if (response.status === 200) {
        const json = await response.json();
        return new OpenWeatherMapWeatherData(json);
    }
    return null;
}

async function requestWeatherByName(cityName) {
    return requestWeatherInfo({q: cityName});
}

async function requestWeatherByLocation(lat, lon) {
    return requestWeatherInfo({lat: lat, lon: lon});
}

module.exports.requestWeatherByName = requestWeatherByName;
module.exports.requestWeatherByLocation = requestWeatherByLocation;
