const asyncHandler = require("express-async-handler");

const openWeatherMapRequests = require("../../datasources/openweathermap/requests");

module.exports = function (app, favouritesStorage) {
    app.get("/favourites", asyncHandler(async (req, res) => {
        res.send(await favouritesStorage.getAll());
    }));

    app.post("/favourites", asyncHandler(async (req, res) => {
        const cityName = req.query.q;

        if (cityName === undefined) {
            res.status(400).send();
            return;
        }

        let exists = await favouritesStorage.isContain(cityName);
        if (exists) {
            res.status(409).send();
            return;
        }

        let json = await openWeatherMapRequests.requestWeatherByName(cityName);
        if (json == null) {
            res.status(404).send();
            return;
        }

        exists = await favouritesStorage.isContain(json.name);
        if (exists) {
            res.status(409).send();
            return;
        }

        res.status(200).send(json);
        await favouritesStorage.addWithName(cityName);
    }));

    app.delete("/favourites", asyncHandler(async (req, res) => {
        const cityName = req.query.q;

        if (cityName === undefined) {
            res.status(400).send();
            return;
        }

        const result = await favouritesStorage.removeByName(cityName);
        if (result !== true) {
            res.status(404);
        }
        res.send();
    }));
};