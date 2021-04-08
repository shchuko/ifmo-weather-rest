function getApiKeyFromEnv() {
    const apiKey = process.env.OPENWEATHERMAP_KEY;
    if (apiKey === undefined) {
        throw new Error("OPENWEATHERMAP_KEY env variable is not set")
    }

    return apiKey;
}

module.exports = {
    url: "https://api.openweathermap.org/data/2.5/weather",
    apiKey: getApiKeyFromEnv()
};