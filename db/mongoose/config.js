function getUrlFromEnv() {
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    if (password === undefined) {
        throw new Error("MONGODB_PASSWORD env variable is not set");
    }
    if (user === undefined) {
        throw new Error("MONGODB_USER env variable is not set");
    }

    return `mongodb+srv://${user}:${password}@cluster0.fycwi.mongodb.net/weatherDatabase?retryWrites=true&w=majority`;
}

module.exports = {
    url: getUrlFromEnv()
};