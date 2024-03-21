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
  tempNumber.innerHTML = Math.round(response.data.temperature.current);
  // if (
  //   response.data.country == "United States of America" ||
  //   response.data.country == "Myanmar" ||
  //   response.data.country == "Liberia"
  // ) {
  //   tempScale.innerHTML = `°F`;
  // } else {
  //   tempScale.innerHTML = `°C`;
  // }
  tempScale.innerHTML = `°C`;
  currentDate.innerHTML = returnDate(date);
  sky.innerHTML = response.data.condition.description;
  wordHumidity.innerHTML = `Humidity: `;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  comma.innerHTML = `,`;
  wordWind.innerHTML = `Wind: `;
  // if (
  //   response.data.country == "United States of America" ||
  //   response.data.country == "Myanmar" ||
  //   response.data.country == "Liberia"
  // ) {
  //   windSpeed.innerHTML = `${response.data.wind.speed}mph`;
  // } else {
  //   windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  // }
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
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
searchCity("Paris");
let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", submitCity);
