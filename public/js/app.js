console.log("client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationHtml = document.querySelector("#location");
const forecastHtml = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
  const location = search.value;
  locationHtml.textContent = 'Loading...';
	forecastHtml.textContent = '';
  search.value = "";

	fetch(`http://localhost:3000/weather?adress=${location}`).then((res) => {
		res.json().then((data) => {
			if (data.error) {
        locationHtml.textContent = data.error
			} else {
        locationHtml.textContent = data.location;
        forecastHtml.textContent = data.forecast;
			}
		});
	});

	
	console.log(location);
});
