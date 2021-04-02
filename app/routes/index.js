const weatherRoutes = require('./weather_routes');
module.exports = function(app, db) {
    weatherRoutes(app, db);

};