const asyncHandler = require("express-async-handler");

const openWeatherMapRequests = require("../../datasources/openweathermap/requests");

module.exports = function (app) {
    app.get("/weather/city", asyncHandler(async (req, res) => {
        const cityName = req.query.q;

        const json = await openWeatherMapRequests.requestWeatherByName(cityName);
        if (json == null) {
            res.status(404).send();
            return;
        }
        res.send(json);
    }));

    app.get("/weather/coordinates", asyncHandler(async (req, res) => {
        const lat = req.query.lat;
        const lon = req.query.long;

        const json = await openWeatherMapRequests.requestWeatherByLocation(lat, lon);
        if (json == null) {
            res.status(404).send();
            return;
        }
        res.send(json);
    }));
};