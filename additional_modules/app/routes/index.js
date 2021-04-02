const weatherRoutes = require("./weather");
const favouritesRoutes = require("./favourites");

module.exports = function (app, mongoose) {
    weatherRoutes(app);
    favouritesRoutes(app, mongoose);
};