const apiKey = "a5fcce8f6f1f27e03e5db66422ee0b99";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
let cityName = "&q=cairo";
let inputName = document.querySelector(".searchBox");
let weatherStatusIcon = document.querySelector(".icon");
let errorMsg = document.querySelector(".error");

async function checkWeather(cityName) {
    const response = await fetch(apiUrl + `&appid=${apiKey}` + cityName);

    if (response.status == 404) {
        errorMsg.style.display = "block";
    } else {
        var data = await response.json();
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".cityName").textContent = data.name;
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";

        if (data.weather[0].main === "Clouds") {
            weatherStatusIcon.src = "assets/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherStatusIcon.src = "assets/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherStatusIcon.src = "assets/rain.png";
        } else if (data.weather[0].main === "Mist") {
            weatherStatusIcon.src = "assets/mist.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherStatusIcon.src = "assets/drizzle.png";
        }
        errorMsg.style.display = "none";
        saveCityName(cityName);
    }
}

function saveCityName(cityName) {
    localStorage.setItem("cityName", cityName);
}

window.onload = function () {
    const savedCity = localStorage.getItem("cityName");
    if (savedCity) {
        cityName = savedCity;
    }
    checkWeather(cityName);
};

function searchFor () {
    cityName = `&q=${inputName.value}`;  
    checkWeather(cityName);  
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchFor();
    }
});


document.querySelector(".searchButton").onclick = searchFor();
