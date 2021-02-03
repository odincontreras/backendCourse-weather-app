const axios = require('axios');

const geocode = (adress, callback) => {
	const token =
		"pk.eyJ1Ijoib2RpbmNvbnRyZXJhcyIsImEiOiJja2trMWZnM3UwYXJ5MnVtbjZld2JkMjEwIn0.gYTT4I0GCL8fm8VCnG-fmw";
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		adress
	)}.json?access_token=${token}&limit=1`;

	axios
		.get(url)
		.then(({data}) => {
			if (data.features.length === 0) {
				callback("Unable to find location. Try another search", undefined);
			} else {
				const longitude = data.features[0].center[0];
				const latitude = data.features[0].center[1];
				const placeName = data.features[0].place_name;
				callback(undefined, {
					placeName,
					latitude,
					longitude
				});
			}
		})
		.catch(() => {
			callback("Unable to connect to Geocoding service!", undefined);
		});
};

module.exports = geocode;