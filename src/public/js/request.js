const geonamesUrl = 'http://api.geonames.org/';
const geonamesKey = 'Daggron';
const geonamesQuery = 'searchJSON?formatted=true&q=';

const darkSkyURL = 'https://api.darksky.net/forecast/';
const darkSkyKey = 'b9ec8785be758ca20484c4940d52e161';

const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayKey = '10294810-dbdbea783e3d3fb62bba039d7';



async function getGeoLocation(location) {
  const endpoint = geonamesUrl + geonamesQuery + location + '&username=' + geonamesKey + '&style=full'; 
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const location = {};
      const jsonRes = await response.json();
      
      location.latitude = jsonRes.geonames[0].lat;
      location.longitude = jsonRes.geonames[0].lng;
      location.countryCode = jsonRes.geonames[0].countryCode;
      return location;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getWeatherForecast(latitude, longitude) {
  const endpoint = darkSkyURL + darkSkyKey + `/${latitude}, ${longitude}`;
  try {
    const response = await fetch('http://localhost:8080/forecast',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: endpoint })
      });
    if (response.ok) {
      const jsonRes = await response.json();
      return jsonRes;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getImageURL(city, country) {
  const queryCity = `&q=${city}&image_type=photo&pretty=true&category=places`;
  const queryCountry = `&q=${country}&image_type=photo&pretty=true&category=places`
  
  const cityEndpoint = pixabayURL + pixabayKey + queryCity;
  const countryEndpoint = pixabayURL + pixabayKey + queryCountry;
  try {
    let response = await fetch(cityEndpoint);
    if (response.ok) {
      let jsonRes = await response.json();
      if (jsonRes.totalHits === 0) {
        response = await fetch(countryEndpoint);
        if (response.ok) {
          jsonRes = await response.json();
          return jsonRes.hits[0].largeImageURL;
        }
      }
      return jsonRes.hits[0].largeImageURL;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getCountryInfo(countryCode) {
  const endpoint = `https://restcountries.eu/rest/v2/alpha/${countryCode}`
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const jsonRes = await response.json();
      return {
               name: jsonRes.name,
               flag: jsonRes.flag
            }
    }
  } catch (error) {
    console.log(error);
  }
}


export { getGeoLocation, getImageURL, getCountryInfo, getWeatherForecast };

