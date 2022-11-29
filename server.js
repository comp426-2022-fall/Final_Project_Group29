#!/usr/bin/env node

// Importing necessary dependencies
const minimist = require('minimist');
const express = require('express');

// Creating an Express server object 
const app = express();

// Reading in command line arguments
const args = minimist(process.argv.slice(2));

// Sets port number based on argument or defaults to 5000
const port = args.port || 5000;

// Root endpoint, (describe what initial page does)
app.get('/app/', (req, res, next) => {
    res.status(200);
    res.send("Status code : 200 OK");
});

// Tells server to listen on the correct port
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});