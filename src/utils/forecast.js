const request = require("request");

const forecast = (location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fea4771137ba30b055e79d99a2dc574b&query=${location}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to the weather service!");
        } else if (body.error) {
            callback("unable to find location, please try again!");
        } else {
            const name = body.location.name;
            const country = body.location.country;
            const region = body.location.region;
            const currentWeatherData = body.current;
            callback(undefined, { country, name, region, currentWeatherData });
        }
    });
};

module.exports = forecast;
