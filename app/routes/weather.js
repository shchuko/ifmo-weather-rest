const openWeatherMapRequests = require("../../datasources/openweathermap/requests");

module.exports = function (app) {
    app.get("/weather/city", (req, res) => {
        const cityName = req.query.q;

        openWeatherMapRequests.requestWeatherByName(cityName)
            .then(json => {
                res.send(json);
            })
            .catch(() => res.status(404).send("Not found"));
    });

    app.get("/weather/coordinates", (req, res) => {
        const lat = req.query.lat;
        const lon = req.query.long;

        openWeatherMapRequests.requestWeatherByLocation(lat, lon)
            .then(json => {
                res.send(json);
            })
            .catch(() => res.status(404).send("Not found"));
    });
};