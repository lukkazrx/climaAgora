// variables

const apiKey = "85cc09e58fff846a43c3a91eb822355b";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const errorMessageContainer = document.querySelector("#error-message");

const weatherContainer = document.querySelector("#weather-data");

// functions 

const getWeatherData = async(city) => {
  
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}
// mensagem de erro

const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
};


const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  if (data.cod === "404") {
    hideInformation();
    showErrorMessage();
    return;
  }

  if (data.name) {
    hideInformation()
  }

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  weatherContainer.classList.remove("hide");
};


// events

searchBtn.addEventListener("click", (e) => {

  e.preventDefault()

  const city = cityInput.value;

  showWeatherData(city);

});

cityInput.addEventListener("keyup", (e) => {

  if(e.code=== 'Enter') {
    const city = e.target.value;

    showWeatherData(city);
  }

})