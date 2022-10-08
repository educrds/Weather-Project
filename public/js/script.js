const countryDropdown = document.getElementById("country-dropdown");
const cityDropdown = document.getElementById("city-dropdown");

//   ------------------------ API COUNTRIES HEADER ---------------------------------
var headers = new Headers();
headers.append(
  "X-CSCAPI-KEY",
  "dWRXTUFMcGFveUg5U1llZGE3VUxQZTNadjJnczlUMTNMaG5YSnVyeQ=="
);

var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//   ------------------------  EVENTO DE CARREGAMENTO DA PÁGINA ------------------
document.addEventListener("DOMContentLoaded", () => {
  let option;

  var day = new Date().toLocaleDateString("pt-br", {
    weekday: "long",
  });
  document.getElementById("weekDay").innerHTML =
    capitalizeFirstLetter(day) + ",";

  //   ------------------------ API COUNTRIES(STATES) ---------------------------------
  fetch(
    "https://api.countrystatecity.in/v1/countries/BR/states",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) =>
      JSON.parse(result).map((item) => {
        option = document.createElement("option");
        option.setAttribute("id", item.iso2);
        option.text = item.name;
        countryDropdown.add(option);
      })
    )
    .catch((error) => console.log("error", error));
});

//   ------------------------ EVENTO AO ALTERAR PAIS ---------------------------------
countryDropdown.addEventListener("change", function () {
  const iso = countryDropdown.options[countryDropdown.selectedIndex].id;

  cityDropdown.length = 0;

  let defaultOption = document.createElement('option');
  defaultOption.text = 'Cidade';

  cityDropdown.add(defaultOption);
  cityDropdown.selectedIndex = 0;

  //   ------------------------ API COUNTRIES(CITIES) ---------------------------------
  fetch(
    `https://api.countrystatecity.in/v1/countries/BR/states/${iso}/cities`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) =>
      JSON.parse(result).map((item) => {
        option = document.createElement("option");
        option.text = item.name;
        cityDropdown.add(option);
      })
      
    )
    .catch((error) => console.log("error", error));
});

const buttonSearch = document.getElementById("search-button");

buttonSearch.addEventListener("click", function () {
  const city = cityDropdown.options[cityDropdown.selectedIndex].text;
  const iso = countryDropdown.options[countryDropdown.selectedIndex].id;
  
  const elements = document.getElementById("allElements");
  const API = "d63bfabd0c861ed3e5d836ba9c75e4ba";
  elements.style.display = "block";  


  //   ------------------------ API WEATHER ---------------------------------
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric&lang=pt_br`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      document.getElementById("cityNavBar").innerHTML = `${city}-${iso}`;

      document.getElementById("city").innerHTML = city;

      document.getElementById("description").innerHTML =
        `${data.weather[0].description} em`;

      document.getElementById(
        "weatherImg"
      ).src = `imgs/${data.weather[0].icon}.svg`;

      document.getElementById("temp").innerHTML = Math.round(data.main.temp);

      document.getElementById("tempMin").innerHTML = Math.round(data.main.temp_min);

      document.getElementById("tempMax").innerHTML = Math.round(
        data.main.temp_max
      );

      document.getElementById("humidity").innerHTML = Math.round(
        data.main.humidity
      );

      document.getElementById("windSpeed").innerHTML = Math.imul(
        data.wind.speed,
        3.6
      );
    })
    .catch((err) => {
        window.location.href = "/404"
    });
});

const toggle = document.getElementById("toggle");

toggle.addEventListener("click", ()=>{
  document.documentElement.classList.toggle("dark-mode");
})