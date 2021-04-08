module.exports = function (mongoose) {
    const Schema = mongoose.Schema;
    const favouriteCitySchema = new Schema({cityName: {type: "string", unique: true}}, {versionKey: false});

    return mongoose.model("Favourites", favouriteCitySchema);
};
