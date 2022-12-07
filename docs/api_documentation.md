## Dependencies
Run ```npm install``` in command-line to install the following dependencies:
- Express (4.18.2): used for creation of server for API
- Minimist (1.2.7): used for parsing port argument from command-line
- Moment-timezone (0.5.39): used for guessing user timezone as default value
- Node-fetch (3.3.0): used for data retrieval from Open Mateo

## Command-line arguments
Use ```node server.js``` to start a server on default port 5000.\
Expected command-line output:
```
Server is listening on port 5000 
Go to http:/localhost:5000/app to interact with server
```

A specific port number can be specified using argument ```--port=5500```.\
Example input: ```node server.js --port=5500```\
Expected output:
```
Server is listening on port 5500
Go to http:/localhost:5500/app to interact with server
```

## Endpoints
**'/app/'**\
Once the server has been started, entering ```http://localhost:[PORT_NUMBER]/app``` into the browser will take the user to the homepage of the application.\
Example url: ```http:/localhost:5500/app```\
Expected browser output:
```
Status code : 200 OK.

Add /weather to url to run weather app with default values.

To specify arguments, add them to the url in the following format (replace each word with desired value): /latitude/longitude/country/city/num_of_days
```

**'/app/weather/'**\
This endpoint runs the main function of the app, retrieving weather data, using default values for latitude (35.875), longitude (-79), timezone (moment.tz.guess()),
and day (1).\
Example url: ```http:/localhost:5500/app/weather```\
Expected browser output:
```
You might need your galoshes tomorrow.

Full weather data:
{"latitude":35.86053,"longitude":-78.992645,"generationtime_ms":1.277923583984375,"utc_offset_seconds":-18000,"timezone":"America/New_York","timezone_abbreviation":"EST","elevation":99,"current_weather":{"temperature":12.2,"windspeed":4.4,"winddirection":9,"weathercode":3,"time":"2022-12-06T22:00"},"daily_units":{"time":"iso8601","precipitation_hours":"h"},"daily":{"time":["2022-12-06","2022-12-07","2022-12-08","2022-12-09","2022-12-10","2022-12-11","2022-12-12"],"precipitation_hours":[0,3,0,16,5,0,4]}}
```

**'/app/weather/:latitude/:longitude/'**\
This endpoint retrieves weather data using latitude and longitude values specified in the url and the defaults for timezone and day.\
Example url: ```http:/localhost:5500/app/weather/39/-27```\
Expected browser output:
```
You might need your galoshes tomorrow.

Full weather data:
{"latitude":39,"longitude":-27,"generationtime_ms":0.40602684020996094,"utc_offset_seconds":-18000,"timezone":"America/New_York","timezone_abbreviation":"EST","elevation":0,"current_weather":{"temperature":15.3,"windspeed":52.7,"winddirection":334,"weathercode":2,"time":"2022-12-06T23:00"},"daily_units":{"time":"iso8601","precipitation_hours":"h"},"daily":{"time":["2022-12-06","2022-12-07","2022-12-08","2022-12-09","2022-12-10","2022-12-11","2022-12-12"],"precipitation_hours":[24,23,17,11,4,0,0]}}
```

**'/app/weather/:latitude/:longitude/:region/:city'**\
This endpoint retrieves weather data using the specified latitude, longitude, and timezone (based on region and city), still using default day of 1.\
Example url: ```http:/localhost:5500/app/weather/39/-27/Europe/Berlin```\
Expected browser output:
```
You might need your galoshes tomorrow.

Full weather data:
{"latitude":39,"longitude":-27,"generationtime_ms":0.4049539566040039,"utc_offset_seconds":3600,"timezone":"Europe/Berlin","timezone_abbreviation":"CET","elevation":0,"current_weather":{"temperature":15.3,"windspeed":52.7,"winddirection":334,"weathercode":2,"time":"2022-12-07T05:00"},"daily_units":{"time":"iso8601","precipitation_hours":"h"},"daily":{"time":["2022-12-07","2022-12-08","2022-12-09","2022-12-10","2022-12-11","2022-12-12","2022-12-13"],"precipitation_hours":[24,16,11,10,0,0,0]}}
```

**'/app/weather/:latitude/:longitude/:region/:city/:day'**\
This endpoint retrieves weather data using the specified latitude, longitude, timezone, and number of days from now.\
Example url: ```http:/localhost:5500/app/weather/39/-27/Europe/Berlin/4```\
Expected browser output:
```
You probably won't need your galoshes in 4 days.

Full weather data:
{"latitude":39,"longitude":-27,"generationtime_ms":0.4010200500488281,"utc_offset_seconds":3600,"timezone":"Europe/Berlin","timezone_abbreviation":"CET","elevation":0,"current_weather":{"temperature":15.3,"windspeed":52.7,"winddirection":334,"weathercode":2,"time":"2022-12-07T05:00"},"daily_units":{"time":"iso8601","precipitation_hours":"h"},"daily":{"time":["2022-12-07","2022-12-08","2022-12-09","2022-12-10","2022-12-11","2022-12-12","2022-12-13"],"precipitation_hours":[24,16,11,10,0,0,0]}}
```

**'/\*/'**
This endpoint catches when the user puts an invalid url path in, returning an error.
Example url: ```http:/localhost:5500/app/wrong```\
Expected browser output:
'''
404 NOT FOUND
'''
