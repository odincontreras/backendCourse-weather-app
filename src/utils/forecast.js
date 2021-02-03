const request = require('request');

const forecast = (lat, long, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=096dd0ba125c323b2cd39fe52577c293&query=${lat},${long}`;
	request({ url, json: true }, (error, {body}) => {
		if (error) {
			callback("Unable to connect to Weather service!", undefined);
		} else if (body.error) {
			callback(body.error.info, undefined);
		} else {
			const temperature = body.current.temperature;
			const feelslike = body.current.feelslike;
			const description = body.current.weather_descriptions[0];
			const humidity = body.current.humidity
			callback(
				undefined,
				`${description}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees and the Humidity is ${humidity}%`
			);
		}
	});
};

module.exports = forecast;