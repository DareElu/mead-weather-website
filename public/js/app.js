const fetchPuzzleData = async (location) => {
    const response = await fetch(
        `http://localhost:3000/weather?address=${location}`
    );
    const data = await response.json();

    if (data.error) {
        return data.error;
    } else {
        return [data.address, data.forecast];
    }
};

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector(".input-country");
const output = document.querySelector(".output");
const forecast = document.querySelector(".forecast");

weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = searchInput.value;
    const result = await fetchPuzzleData(location);
    const weatherData = result;

    if (typeof result === "string") {
        output.innerHTML = result;
    } else {
        output.innerHTML = JSON.stringify(Object.values(weatherData[0]))
            .replace("[", "")
            .replace("]", "")
            .replaceAll('"', "");
        forecast.innerHTML = weatherData[1];
    }
    console.log(typeof weatherData);
});
