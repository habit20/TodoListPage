//API key 받아오기
const API_KEY = 'eb8c114301d2aa698c95be50b0013a03';

const weather = document.querySelector('.js-weather');

// // localstorage에 좌표가 없으면 받고, 있으면 날씨 출력
// navigator.geolocation.getCurrentPosition : 각각 성공 실패시 콜하는 함수
const COORDS = "coords";

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temp = json.main.temp;
        const name = json.name;
        console.log(temp, name);
        weather.innerHTML = `It's ${temp}°C @${name}`;
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function geoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, longitude
    }

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function geoError(){
    console.log('Failed');
}


function askForCoords(){
    const position = navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    console.log(position);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords();
    }
    else{
        const tempCoords = JSON.parse(loadedCoords);
        getWeather(tempCoords.latitude, tempCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();