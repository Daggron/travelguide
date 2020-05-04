const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('dist'));


const trips = [];

app.get('/', (req, res) => {
  res.status(200).sendFile('dist/index.html');
});

app.post('/save', (req, res) => {
  if (req.body === " ") return res.status(400).json('bad request');

  const trip = req.body.trip;
  trips.push(trip);
  res.status(201).send(trip);
});

app.post('/forecast', async (req, res) => {

  if(req.body.endpoint === " ") {
    return res.status(400).json('Bad Request');
  }

  const endpoint = req.body.endpoint;
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const json = await response.json();
      res.status(201).send(json);
    }
  } catch (error) {
    console.log(error);
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Firing on port ${PORT}`);
});

// Please Uncomment the line below to run the tests
export {app};