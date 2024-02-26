const apiKey = "4ed4cc73ec5fd6c62e3defd157db2a14";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=fr&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");




async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".ressenti").innerHTML = "ressenti: " + Math.round(data.main.feels_like) + "°C";
        document.querySelector(".minimum").innerHTML = "Min: " + Math.round(data.main.temp_min) + "°C";
        document.querySelector(".maximum").innerHTML = "Max: " + Math.round(data.main.temp_max)  + "°C";
        document.querySelector(".description").innerHTML = data.weather[0].description;


        var backgroundWeather = "#00a2ff";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
            backgroundWeather = "#3a7394";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
            backgroundWeather = "#00a2ff";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
            backgroundWeather = "#49555c";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            backgroundWeather = "#aec6d4";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
            backgroundWeather = "#aec6d4";
        }

        document.querySelector(".rectangle").style.background = `linear-gradient(135deg, ${backgroundWeather}, #8d8d8d)`;

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})