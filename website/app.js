/* Global Variables */

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API Key for OpenWeatherMap API

const apiKey = "7d6d82513852cadbdf31a91f20ebe05c&units=imperial";

/* Create a new date instance dynamically with JS */

// toLocalString method returns a string of the given date

// en-US uses month-day-year order and 12-hour time with AM/PM

// long returns the full month name

// numeric returns a value

let d = new Date();
let newDate = d.toLocaleString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

// Event listener to add function to existing HTML DOM element

document.getElementById("generate").addEventListener("click", displayData);

function displayData() {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getTemperature(baseURL, zipCode, apiKey).then(function (data) {
    postData("http://localhost:8000/postData", {
      temperature: data.main.temp,
      date: newDate,
      user_response: feelings,
    }).then(function () {
      retrieveData();
    });
  });
}

/* Function to GET Web API Data*/

const getTemperature = async (baseURL, code, apiKey) => {
  const response = await fetch(baseURL + code + "&appid=" + apiKey);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

/* Function to POST data */

const postData = async (url = "", data = {}) => {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await request.json();
    return newData;
  } catch (error) {
    console.log("Error", error);
  }
};

/* Function to GET Project Data */

const retrieveData = async () => {
  const request = await fetch("http://localhost:8000/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML =
      Math.round(allData.temperature) + " degrees";
    document.getElementById("content").innerHTML = allData.user_response;
  } catch (error) {
    console.log("Error", error);
  }
};
