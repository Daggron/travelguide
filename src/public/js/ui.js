import { countdown } from './utils';
import 'bootstrap';
const $ = require("jquery");

//handling ui updates of the dom
const getTripDate = (date) => {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const tripDate = new Date(date);
  const tripDateText = `${days[tripDate.getDay()]}, ${months[tripDate.getMonth()]} ${tripDate.getDate()}, ${tripDate.getFullYear()}`;

  return tripDateText;
}

const getWeatherInfo = (weatherForecast, date) => {
  
  const weather = {
    temperature: 0,
    summary: '',
    forecastTemp: 0,
    forecastSummary: ''
  };

  weather.temperature = weatherForecast.currently.temperature;
  weather.summary = weatherForecast.currently.summary;
  
  date = Date.parse(date);
  
  for (let i = 0; i < weatherForecast.daily.data.length; i++) {
    if (date >= weatherForecast.daily.data[i].time) {
      weather.forecastTemp = weatherForecast.daily.data[i].temperatureHigh;
      weather.forecastSummary = weatherForecast.daily.data[i].summary;
      break;
    }
  }
  return weather;
}

const showModal = (trip) => {
  
  document.querySelector('.caption').style.display = 'none';
  
  $('#tripModal').modal({
    keyboard: false
  })

  // when the user add a trip and to show the information about the trip 
  // we add a modal which is handled by here provide all the information
  // about the trip in this modal and show the data
  // Feeding the info of the data in the modal
  document.querySelector('.trip_title').innerHTML = `<img src="${trip.countryFlag}" class="flag"> ${trip.city}, ${trip.country}`;
  document.querySelectorAll('.media_heading')[0].innerText = `${trip.city}, ${trip.country}`;
 
  const tripStart = getTripDate(trip.start);
  const tripEnd = getTripDate(trip.end);
  document.querySelectorAll('.media_heading')[1].innerText = tripStart;
  document.querySelectorAll('.media_heading')[2].innerText = tripEnd;

  document.querySelectorAll('.media_heading')[3].innerHTML = `<span class="blue">${countdown(trip.start, trip.end)}</span> days`;

  document.querySelector('.images').setAttribute('src', trip.image);

  const daysLeft = countdown(new Date(), trip.start);
  document.querySelector('.trip_countdown').innerHTML = `Your trip to <span class="blue">${trip.city}</span> is <span class="blue"> ${daysLeft}</span> days away`;

  const weather = getWeatherInfo(trip.weatherForecast, tripStart);

  if (daysLeft < 7) {
    document.querySelector('.trip_weather').innerHTML = `<p class="mt-1">The current weather:</p>
                                                       <p class="mt-1 blue">${weather.temperature}&deg;F</p>
                                                       <p class="mt-1 blue">${weather.summary}</p>`;
  } else {
    document.querySelector('.trip_weather').innerHTML = `<p class="mt-1">Weather forecast for then:</p>
                                                       <p class="mt-1 blue">${weather.forecastTemp}&deg;F</p>
                                                       <p class="mt-1 blue">${weather.summary}</p>`;
  }
  
}

const displayTrip = (trip) => {

  // When the user save a trip a seperate list of div is maintained and
  // showed to the user which is handled here
  // the modal which is shown here is closed 
  // and the similar div is rendered to the ui
  document.querySelector('.caption').style.display = 'block';
  document.querySelector('.caption').style.top = '5vh';
  
  $('#tripModal').modal('toggle');

  const tripStart = getTripDate(trip.start);
  const tripEnd = getTripDate(trip.end);
  const daysLeft = countdown(new Date(), trip.start);
  const weather = getWeatherInfo(trip.weatherForecast, tripStart);

  const section = document.createElement('section');
  section.classList.add('trips');

  const div = document.createElement('div');
  
  div.innerHTML = `
  <div class="card mb-3" style="max-width: 768px; margin: 0 auto">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${trip.image}" class="card-img" alt="Picture of Travel Destination">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="card-title trip_title"><img src="${trip.countryFlag}" class="flag"> ${trip.city}, ${trip.country}</h3>
          <h6 class="mt-0">Departure: <span class="blue"> ${tripStart}</span></h6>
          <h6 class="mt-0">Return: <span class="blue">${tripEnd}</span></h6>
          <h6 class="mt-0">Duration: <span class="blue"> ${countdown(trip.start, trip.end)} days</span></h6>
          <span class="trip_countdown">Your trip to <span class="blue">${trip.city}</span> is <span class="blue">${daysLeft}</span> days away</span>
          <p>The current weather:</p>
          <p class="blue">${weather.temperature}&deg;F</p>
          <p class="blue">${weather.summary}</p>
        </div>
      </div>
    </div>
  </div>`;

  section.appendChild(div);
  document.querySelector('.hero').appendChild(section);
}

export { showModal, displayTrip };
