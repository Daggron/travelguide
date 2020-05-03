
function getCity(){
  let city = document.getElementById('city').value;
  city = city.toLowerCase();
  city = city[0].toUpperCase() + city.slice(1);
  return city;
}

function getTripStart() {

  const date = document.getElementById('date_start').value.split('-').join('/');
  return date;
}

function getTripEnd(){
  const date = document.getElementById('date_end').value.split('-').join('/');
  return date;
}

function countdown (start, end) {

  const tripStart = Date.parse(start);
  const tripEnd = Date.parse(end);

  const countdown = tripEnd - tripStart;

  const daysLeft = Math.ceil(countdown / 86400000);

  return daysLeft;
}

export { getCity, getTripStart, getTripEnd, countdown};