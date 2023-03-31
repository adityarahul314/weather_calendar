function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

//declaring public variables
var date;
var y;
var m;
var firstDate;
var lastDate;
var firstDay;
var lastDay;
var Today;
var refreshcount = 0;
var w_apiurl = 'http://api.openweathermap.org/data/2.5/weather?q=Hyderabad,in&APPID=111111111111111111111111111111111&units=metric';
var lastTime = 0;

function getdata() {
	date = new Date();
	y = date.getFullYear();
	m = date.getMonth();
	firstDate = new Date(y,m,1);
	lastDate = new Date(y,m+1,0);
	firstDay = firstDate.getDay();
	lastDay = lastDate.getDate();
	Today = date.getDate();
}

function refreshcal() {
	getdata();
	for (var i = 0; i < lastDay ; i++) {
		fillDate = i + 1;
		element_id = i + firstDay + 6;
		var id_num = 'day';
		document.getElementById("day" + element_id).textContent = fillDate;
		document.getElementById("day" + element_id).style.color = '#daa623';
		if (fillDate == Today) {
			document.getElementById("day" + element_id).style.color = '#FAFAD2';
		}
	}
	refreshmonyear();
}

function refreshmonyear() {
	document.getElementById("month").textContent = m+1;
	document.getElementById("year1").textContent = String(y).charAt(0);
	document.getElementById("year2").textContent = String(y).charAt(1);
	document.getElementById("year3").textContent = String(y).charAt(2);
	document.getElementById("year4").textContent = String(y).charAt(3);
}

function refreshweather() {
	//await sleep(2000);
	$.getJSON(w_apiurl, function(weatherData) {
		if (weatherData.dt > 1580000000) {
			currentTime = Date.now();
			lastTime = currentTime;
		} else {
			currentTime = Date.now();
			lastTime = currentTime-60000;
		}
	    currentTemp = String(weatherData.main.temp).substring(0,4) + '°C';
	    document.getElementById("temperature").textContent = currentTemp;
	    currentIcon = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png';
	   	document.getElementById("sky").src = currentIcon;
	   	currentFeel = weatherData.weather[0].description + ', Feels like ' + String(weatherData.main.feels_like).substring(0,4); 
	   	document.getElementById("skyfeel").textContent = currentFeel;
	   	currentPressure = weatherData.main.pressure;
	   	document.getElementById("press").textContent = 'Pressure : ' + currentPressure + ' hPa';
	   	currentHumidity = weatherData.main.humidity;
	   	document.getElementById("hum").textContent = 'Humidity : ' + currentHumidity + '%';
	   	currentWind = 'Wind : ' + String(weatherData.wind.speed*3.6).substring(0,4) + ' km/h ' + getdirection(weatherData.wind.deg);
	   	document.getElementById("windy").textContent = currentWind;
	   	currentVisibility = weatherData.visibility;
	   	document.getElementById("visible").textContent = 'Visibility : ' + currentVisibility + ' mts';
	});
}

function getdirection(x) {
	direction = '';
	if (x < (0+11.25)) {
		direction = 'N  ';
	} else if (x < (22.5+11.25)) {
		direction = 'NNE';
	} else if (x < (45+11.25)) {
		direction = 'NE  ';
	} else if (x < (67.5+11.25)) {
		direction = 'ENE';
	} else if (x < (90+11.25)) {
		direction = 'E  ';
	} else if (x < (112.5+11.25)) {
		direction = 'ESE';
	} else if (x < (135+11.25)) {
		direction = 'SE ';
	} else if (x < (157.5+11.25)) {
		direction = 'SSE';
	} else if (x < (180+11.25)) {
		direction = 'S  ';
	} else if (x < (202.5+11.25)) {
		direction = 'SSW';
	} else if (x < (225+11.25)) {
		direction = 'SW ';
	} else if (x < (247.5+11.25)) {
		direction = 'WSW';
	} else if (x < (270+11.25)) {
		direction = 'W  ';
	} else if (x < (292.5+11.25)) {
		direction = 'WNW';
	} else if (x < (315+11.25)) {
		direction = 'NW ';
	} else if (x < (337.5+11.25)) {
		direction = 'NNW';
	} else {
		direction = 'N  ';
	}
	return direction;
}

function debuglive() {
	//
}


async function rtupdate() {
	//debuglive();
	currentfulldate = new Date();
	currentdate = currentfulldate.getDate();
	currentTime = Date.now();
	if (currentdate == Today) {
		//console.log('not yet');
	} else {
		
		refreshcal();
	}
	if ((currentTime-lastTime) > 1800000) {
		refreshweather();
	}
	//console.log(t1 + ' - ' + t2 + ' = ' + (t2-t1));
	await sleep(5000);
	rtupdate();
}

function loadtrigger() {
	currentTime = Date.now();
	lastTime = currentTime-10000;
	refreshcal();
	refreshweather();
	rtupdate();
}