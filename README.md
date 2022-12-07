# Group 29 COMP 426 Final Project - Weather API Server

## Summary 

For our project, we created an API which retrieves data from the Open Meteo API to show the weather of a pariticular region on a certain day, given its longitude and latitude. Our goal was to create an application which facilitates the interaction between two APIs, one of our own design which the user interacts with and an existing one which data is retrieved from based on the user's request.


## Team management
This is a collaborative project by calebbg, libinhang, and CodingPineapple22. The roles focused on by each team member are as follows:

Endpoint design, documentation - calebbg\
Front-end design, repository management - libinhang\
Database design, walkthrough presentation - CodingPineapple22\
Planning - All

Further planning details can be found in this repository in /docs/planning.txt


## Functionality
To begin, download the repository and run ```npm install``` in the command-line. This will install each dependency needed for running the application. 

Executing ```node server.js``` will run the server on a default port (5000), or you can specify a specific port using ```--port=[number]```. Once the server is up, going to http://localhost:5500/app/ will present the default page for the app, which includes instructions on how to retrieve the weather data you desire.\
For example, going to http://localhost:5500/app/weather/ will retrieve weather data from Open Mateo using default values for latitude, longitude, timezone and day. The webpage will display whether you need galoshes based on the data and will print out the data it retrieved.\
You can specify the latitude and longitude values as so: http://localhost:5500/app/weather/##/##.
You can also add arguments for the region, city, and the number of days from now you would like to know about.
