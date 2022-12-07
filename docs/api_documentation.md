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
Once the server has been started, entering ```http:/localhost:[PORT_NUMBER]/app``` into the browser will take the user to the homepage of our application
