import {renderHourlyUpdate,renderDailyForecast} from './renderFunction.js';
// °C
//setting the src path to right img using weather code 
const weatherIcons = {
    0: "public/assets/sunny.svg", // clear sky
    1: "public/assets/cloudy.svg", //cloudy sky
    2: "public/assets/cloudy.svg",
    3: "public/assets/cloudy.svg",
    51: "public/assets/rain.svg", //rainy
    53: "public/assets/rain.svg",
    55: "public/assets/rain.svg",
    61: "public/assets/rain.svg",
    63: "public/assets/rain.svg",
    65: "public/assets/rain.svg",
    66: "public/assets/rain.svg",
    67: "public/assets/rain.svg",
    95: "public/assets/thunder.svg", //thunder
    96: "public/assets/thunder.svg",
    99: "public/assets/thunder.svg",
  };

const date = new Date();
const fullDayHours = 23;
const weekDays = 6;
let currentHour = date.getHours();
let currentDay = date.getDay();
const days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']

// for(let i = 0; i <= 12; i++) {
//     const temperature = 30 - i;
//     renderHourlyUpdate(temperature, currentHour);
//     currentHour = currentHour >= fullDayHours? currentHour - fullDayHours: ++currentHour;
// }

// for(let i = 0; i < 7; i++){
//     const day = days[currentDay];
//     const maxTemp = 25 + i;
//     const minTemp = 20 - i;
//     console.log(currentDay, day, i)
//     currentDay = currentDay >= weekDays? currentDay - weekDays: ++currentDay;
//     // renderDailyForecast(day, minTemp, maxTemp, "cloudy.svg");
// }

async function getWeather() {
    const long = 13.270868;
    const lat = 74.749027;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${long}&longitude=${lat}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,rain_sum,showers_sum&hourly=temperature_2m,rain,weather_code,apparent_temperature,is_day,sunshine_duration,showers,uv_index_clear_sky,uv_index&current=temperature_2m,apparent_temperature,is_day,rain,weather_code,wind_speed_10m,wind_direction_10m,showers,relative_humidity_2m,cloud_cover&timezone=Asia%2FBangkok`;
    
    const res = await fetch(url);
    const data = await res.json();
    passValueToRender(data);
}

getWeather();

function passValueToRender(data) {
    //extracting all the required data
    //current temperatures
    const currentTemperature = Math.round(data.current.temperature_2m);
    const currentTemperatureMin = Math.round(data.daily.temperature_2m_min[0]);
    const currentTemperatureMax = Math.round(data.daily.temperature_2m_max[0]);

    //daily and hourly
    const daily = data.daily;
    const hourly = data.hourly;

    //updates the current temperature
    document.getElementById('currentTemperature').innerHTML = `${currentTemperature} °C`;
    document.getElementById('minTempText').innerHTML = `${currentTemperatureMin} °C`;
    document.getElementById('maxTempText').innerHTML = `${currentTemperatureMax} °C`;

    //using weathercode updating img src
    const code = data.current.weather_code;
    const iconFile = weatherIcons[code] || "/cloud.svg";
    document.getElementById("currentImage").src = iconFile;

    let weatherCondtion = "";
    switch(iconFile) {
        case "public/assets/sunny.svg": 
            weatherCondtion = "Sunny";
            break;
        case "public/assets/cloudy.svg": 
            weatherCondtion = "Cloudy";
            break;
        case "public/assets/rain.svg": 
            weatherCondtion = "Rainy";
            break;
        case "public/assets/thunder.svg": 
            weatherCondtion = "Thunder";
            break;
        default:
            weatherCondtion = "Cloudy";
            break;
    }
    document.getElementById('forecastName').textContent = weatherCondtion;
    console.log(code);

    //extracts temperature and passes to render it out
    hourly.time.map((time, i) => {
        const temperature = Math.round(hourly.temperature_2m[i]);
        const hourlyCode = hourly.weather_code[i];
        const icon = weatherIcons[hourlyCode] || "public/cloud.svg";

        renderHourlyUpdate(temperature, currentHour, icon);
        currentHour = currentHour >= fullDayHours? currentHour - fullDayHours: ++currentHour;
    });



    daily.time.map((date, i) => {
        const day = days[currentDay];
        const maxTemp = Math.round(daily.temperature_2m_max[i]);
        const minTemp = Math.round(daily.temperature_2m_min[i]);
        const dailyCode = daily.weather_code[i];
        const icon = weatherIcons[dailyCode] || "public/cloud.svg";

        currentDay = currentDay >= weekDays? currentDay - weekDays: ++currentDay;
        renderDailyForecast(day, minTemp, maxTemp, icon)
    });
}





