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
    res.send("Status code : 200 OK");
});

// Retrieves weather data with default values
app.get('/app/weather/', (req, res, next) => {
    res.status(200);
    weather_retrieve(35.875,-79,moment.tz.guess(),1);
});

// Retrieves data with specified longitude and latitude
app.get('/app/weather/:latitude/:longitude', (req, res, next) => {
    res.status(200);
    weather_retrieve(req.params.latitude,req.params.longitude,moment.tz.guess(),1);
});

// Retrieves data with specified longitude, latitude, and timezone
app.get('/app/weather/:latitude/:longitude/:timezone', (req, res, next) => {
    res.status(200);
    weather_retrieve(req.params.latitude,req.params.longitude,req.params.timezone,1);
});

// Retrieves data with specified longitude, latitude, and timezone
app.get('/app/weather/:latitude/:longitude/:timezone/:day', (req, res, next) => {
    res.status(200);
    weather_retrieve(req.params.latitude,req.params.longitude,req.params.timezone,req.params.day);
});

// Returns error if a nonexistant endpoint is used
app.get('*', (req, res, next) => {
    res.status(404);
    res.send("404 NOT FOUND");
});

// Tells server to listen on the correct port
app.listen(port, () => {
    console.log("Server is listening on port " + port);
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
    if (data.daily.precipitation_hours[day] > 0) {
        process.stdout.write("You might need your galoshes ");
    }
    else {
        process.stdout.write("You probably won't need your galoshes ")
    }

    if (day == 0) {
    console.log("today.");
    } else if (day > 1) {
    console.log("in " + day + " days.");
    } else {
    console.log("tomorrow.");
    }
}