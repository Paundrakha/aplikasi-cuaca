let weather = {
    apiKey: "API key nya taruh sini",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
                alert("Cuaca tidak ditemukan");
                throw new Error("Cuaca tidak ditemukan");
            }
            return response.json();
        })
        .then((data) => this.displayWeather
        (data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".kota").innerText = "Cuaca di " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "kelembapan: " + humidity + "%";
        document.querySelector(".wind").innerText = "Kecepatan angin: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = 
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".cari-bar").value);
    },
};

document.querySelector(".cari-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("klaten");

