#!/usr/bin/env node

// Importing necessary dependencies
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';
import express from 'express';

// Creating an Express server object 
const app = express();

// Reading in command line arguments
const args = minimist(process.argv.slice(2));

// Sets port number based on argument or defaults to 5000
const port = args.port || 5000;

// Root endpoint
app.get('/app/', (req, res, next) => {
    res.status(200);
    res.send("Status code : 200 OK. <br/><br/>Add /weather to url to run weather app with default values. <br/><br/>To specify arguments, add them to the url in the following format (replace each word with desired value): /latitude/longitude/country/city/num_of_days");
});

// Retrieves weather data with default values
app.get('/app/weather/', async (req, res, next) => {
    res.status(200);
    let weather = await weather_retrieve(35.875,-79,moment.tz.guess(),1);
    res.send(weather);
});

// Retrieves data with specified longitude and latitude
app.get('/app/weather/:latitude/:longitude', async (req, res, next) => {
    res.status(200);
    let weather = await weather_retrieve(req.params.latitude,req.params.longitude,moment.tz.guess(),1);
    res.send(weather);
});

// Retrieves data with specified longitude, latitude, and timezone
app.get('/app/weather/:latitude/:longitude/:country/:city', async (req, res, next) => {
    res.status(200);
    let timezone = req.params.country + "/" + req.params.city;
    let weather = await weather_retrieve(req.params.latitude,req.params.longitude,timezone,1);
    res.send(weather);
});

// Retrieves data with specified longitude, latitude, timezone, and day
app.get('/app/weather/:latitude/:longitude/:country/:city/:day', async (req, res, next) => {
    res.status(200);
    let timezone = req.params.country + "/" + req.params.city;
    let weather = await weather_retrieve(req.params.latitude,req.params.longitude,timezone,req.params.day);
    res.send(weather);
});

// Returns error if a nonexistant endpoint is used
app.get('*', (req, res, next) => {
    res.status(404);
    res.send("404 NOT FOUND");
});

// Tells server to listen on the correct port
app.listen(port, () => {
    console.log("Server is listening on port " + port);
    console.log("Go to http:/localhost:" + port + "/app to interact with server");
});

async function weather_retrieve(latitude, longitude, timezone, day) {
    // Build url with variables
    const base_url = "https://api.open-meteo.com/v1/forecast";
    const data_string = "latitude=" + latitude + "&longitude=" + longitude + "&daily=precipitation_hours&current_weather=true&timezone=" + timezone;
    const url = base_url + "?" + data_string;

    // Fetch data with url
    const response = await fetch(url);
    const data = await response.json();

    // Get days argument and concat appropriate messages
    let message = "";
    if (data.daily.precipitation_hours[day] > 0) {
        message += "You might need your galoshes ";
    }
    else {
        message += "You probably won't need your galoshes ";
    }

    if (day == 0) {
        message += "today.";
    } else if (day > 1) {
        message += "in " + day + " days.";
    } else {
        message += "tomorrow.";
    }
    return message;
}