const API_KEY = '37fcc2ff94589d2e6179921ef3788fc7'; // 替换成你的API Key

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const resultDiv = document.getElementById('weatherResult');
    const city = cityInput.value.trim();

    if (!city) {
        alert('请输入城市名称');
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('城市未找到');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const weatherInfo = `
        <div class="weather-info">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>温度: ${Math.round(data.main.temp)}°C</p>
            <p>天气: ${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        </div>
    `;
    document.getElementById('weatherResult').innerHTML = weatherInfo;
}
