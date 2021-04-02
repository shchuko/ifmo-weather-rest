const openWeatherMapRequests = require("../../datasources/openweathermap/requests");
const getFavoriteCityModel = require("../../db/favourite_city_model");

module.exports = function (app, mongoose) {
    const favoriteCity = getFavoriteCityModel(mongoose);

    app.get("/favourites", async (req, res) => {
        let cities = undefined;
        let error = undefined;

        await favoriteCity.find()
            .then(value => cities = value)
            .catch(e => error = e);

        if (error) {
            console.log(error);
            res.status(500);
            return;
        }

        let citiesList = [];
        cities.forEach(cityInfo => citiesList.push(cityInfo.cityName));

        res.send({favouriteCitiesNames: citiesList});
    });

    app.post("/favourites", async (req, res) => {
        const cityName = req.query.q;

        if (cityName === undefined) {
            res.status(400).send();
            return;
        }

        let city;
        let error;
        await favoriteCity.find({cityName: cityName})
            .then(value => city = value[0])
            .catch(e => error = e);

        if (error) {
            console.log(error);
            res.status(500);
            return;
        }

        if (city !== undefined) {
            res.status(409).send("Already exists");
            return;
        }

        openWeatherMapRequests.requestWeatherByName(cityName)
            .then(async json => {
                // Name from response may be differ to requested (Kazan -> Kazan')
                await favoriteCity.find({cityName: json.name})
                    .then(value => city = value[0])
                    .catch(e => error = e);

                if (error) {
                    console.log(error);
                    res.status(500);
                    return;
                }

                if (city !== undefined) {
                    res.status(409).send("Already exists");
                    return;
                }

                res.send(json);
                new favoriteCity({cityName: json.name}).save();
            })
            .catch(() => res.status(404).send("Not found"));
    });

    app.delete("/favourites", async (req, res) => {
        const cityName = req.query.q;

        if (cityName === undefined) {
            res.status(400).send();
            return;
        }

        let city = null;
        let error;
        await favoriteCity.findOneAndRemove({cityName: cityName})
            .then(value => city = value)
            .catch(e => error = e);

        if (error) {
            console.log(error);
            res.status(500).send();
            return;
        }

        if (city === null) {
            res.status(404).send();
        }

        res.send();
    });
};