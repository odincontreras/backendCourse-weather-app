const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
//para usar un directorio sin el nombre de view
const viewPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");
//to use handlebars with hbs
app.set("view engine", "hbs");

//para usar un directorio sin el nombre de view
app.set("views", viewPath);

hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Odin Contreras",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Odin Contreras",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page",
		helpText: "I gonna help you",
		name: "Odin Contreras",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.adress) {
		return res.send({
			error: "You must provide a adress term",
		});
	}

	geocode(req.query.adress, (error, { latitude, longitude, placeName } = {}) => {
		if (error) {
			return res.send({error});
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({error});
			}
			res.send({
				forecast: forecastData,
				location: placeName,
				adress: req.query.adress,
			});
		});
	});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}
	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("error", {
		title: "404",
		name: "Odin Contreras",
		errorMessage: "Help article not found",
	});
});

app.get("*", (req, res) => {
	res.render("error", {
		title: "404",
		name: "Odin Contreras",
		errorMessage: "Page not found",
	});
});

app.listen(port, () => {
	console.log("Server is up on port " + port);
});
