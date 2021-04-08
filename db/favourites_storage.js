const getFavoriteCityModel = require("./mongoose/favourite_city_model");
let favoriteCityModel = undefined;

module.exports = {
    init: (mongoose) => {
        favoriteCityModel = getFavoriteCityModel(mongoose)
    },

    getAll: async () => {
        const cities = await favoriteCityModel.find().exec();
        let citiesList = [];
        cities.forEach(cityInfo => citiesList.push(cityInfo.cityName));
        return citiesList;
    },

    isContain: async (cityName) => {
        return await favoriteCityModel.findOne({cityName: cityName}).exec() != null;
    },

    removeByName: async (cityName) => {
        const city = await favoriteCityModel.findOneAndRemove({cityName: cityName}).exec();
        return city !== null;
    },

    addWithName: async (cityName) => {
        new favoriteCityModel({cityName: cityName}).save();
    }
};