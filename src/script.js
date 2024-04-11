function returnDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  console.log(day);
  let hour = date.getHours();
  console.log(hour);
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  console.log(minute);
  return `${day}, ${hour}:${minute}, `;
}
function getForecast(city) {
  let apiKey = `d804a6ef932oaf3dbf673f68a8ff6cta`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function changeWeather(response) {
  let heading = document.querySelector("#heading");
  let tempImg = document.querySelector(".temp-img");
  let tempNumber = document.querySelector(".temp-number");
  let tempScale = document.querySelector(".temp-scale");
  let date = new Date(response.data.time * 1000);
  let currentDate = document.querySelector("#current-date");
  let sky = document.querySelector("#sky");
  let wordHumidity = document.querySelector("#word-humidity");
  let humidity = document.querySelector("#humidity");
  let comma = document.querySelector("#comma");
  let wordWind = document.querySelector("#word-wind");
  let windSpeed = document.querySelector("#wind-speed");
  console.log(response);
  heading.innerHTML = response.data.city;
  tempImg.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.icon}" width="90"/>`;
  if (
    response.data.country == "United States of America" ||
    response.data.country == "Myanmar" ||
    response.data.country == "Liberia"
  ) {
    tempNumber.innerHTML = Math.round(
      (response.data.temperature.current * 9) / 5 + 32
    );
    tempScale.innerHTML = `°F`;
  } else {
    tempNumber.innerHTML = Math.round(response.data.temperature.current);
    tempScale.innerHTML = `°C`;
  }
  currentDate.innerHTML = returnDate(date);
  sky.innerHTML = response.data.condition.description;
  wordHumidity.innerHTML = `Humidity: `;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  comma.innerHTML = `,`;
  wordWind.innerHTML = `Wind: `;
  if (
    response.data.country == "United States of America" ||
    response.data.country == "Myanmar" ||
    response.data.country == "Liberia"
  ) {
    windSpeed.innerHTML = `${
      Math.round((response.data.wind.speed / 1.609) * 100) / 100
    } mph`;
  } else {
    windSpeed.innerHTML = `${response.data.wind.speed} km/h`;
  }
  getForecast(response.data.city);
}
function searchCity(city) {
  let apiKey = `d804a6ef932oaf3dbf673f68a8ff6cta`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeWeather);
}
function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");
  searchCity(searchInput.value);
}
function returnDay(day) {
  let date = new Date(day * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-day">
        <div class="forecast-date">${returnDay(day.time)}</div>
        <img src="${day.condition.icon_url}">
        <div class="forecast-temps">
          <span class="forecast-hi-temp">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </span>
          <span class="forecast-lo-temp">/${Math.round(
            day.temperature.minimum
          )}º</span>
        </div>
      </div>`;
      console.log("displayForecast if-statement ran");
    }
    console.log("displayForecast ran");
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", submitCity);
searchCity("Paris");
