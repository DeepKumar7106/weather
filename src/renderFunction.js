export function renderHourlyUpdate(temperature, hour, imgPath) {
    const container = document.getElementById('hourlyUpdateBox');
    const hourlyUpdate = document.createElement('div');
    hourlyUpdate.classList.add('hourlyUpdate','center');
 
    const temperatureBox = document.createElement('div');
    temperatureBox.classList.add('temperatureBox');

    temperatureBox.innerHTML = `
        <h3 class="temperature">${temperature}</h3>
        <img src="${imgPath}" alt="" class="weatherIcon">
    `
    const timePara = document.createElement('p');
    timePara.classList.add('timePara');
    timePara.innerHTML = hour;

    hourlyUpdate.appendChild(temperatureBox);
    hourlyUpdate.appendChild(timePara);
    container.appendChild(hourlyUpdate);
}

export function renderDailyForecast(day, minTemp, maxTemp, imgPath) {
    const container = document.getElementById('dailyForecastBox');
    const dailyForecast = document.createElement('div');
    dailyForecast.classList.add('dailyForecast','center');

    const dayBox = document.createElement('div');  
    dayBox.classList.add('dayBox');  
    dayBox.innerHTML = `
        <p class="day">${day}</p>
        <img src="${imgPath}" alt="" class="weatherIcon">
    `
    dailyForecast.appendChild(dayBox);

    const temperatureDataBox = document.createElement('div');  
    temperatureDataBox.classList.add('temperatureDataBox','center');  
    temperatureDataBox.innerHTML = `
        <p class="minTemperature">${minTemp}</p>
        <p class="maxTemperature">${maxTemp}</p>
    `
    dailyForecast.appendChild(temperatureDataBox);
    container.appendChild(dailyForecast);
}

