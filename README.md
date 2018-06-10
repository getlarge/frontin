# Getlarge Portfolio Frontin'

**frontin** is a **Vue.js - D3.js - Socket.io** client application, which works in conjunction with [bareback](https://framagit.org:getlarge/portfolio-server).

## Table of Contents
- [Features](#features)
- [Setup](#setup)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features
### Client
+ real-time data visualization with a multi-series line chart
+ dynamic slider which controls the chart render frequency (renders chart after N message(s))
	+ this is useful for optimization purposes, especially in high-frequency real-time streams, where you 	can	lower the chart render calls in order to lessen the CPU load. 


## Setup
### Prerequisites

+ node.js
+ npm

Once installed in your machine, you can simply run the commands listed in the steps below.


## Installation

To get started with this project, follow the 3-step installation, described here.

### 1. broka-billy *broker* 

Navigate inside the root folder and run:

```
npm install
npm start
```
this will install the dependencies and start the Mosca broker locally on port 1883.

If the server-app and broker-app are already running in separate terminals, you can see the data stream inside the terminal. 


### 2. bareback *server*  

Navigate inside the root folder and run:

```
npm install
npm start
```
this will install the dependencies and start the express server locally on port 3000.


### 3. frontin *client*

*Before running the client, be sure you have already completed steps 1 and 2, and have both Moquette and mqtt-realtime-chart-server running in separate terminal windows.*

Open a new terminal window and navigate inside the root folder of the client application, then run:

```
npm install
npm start
```

After compilation, you will see the link in the terminal *(e.g. http://localhost:8081)* where the application is currently running. Use your browser to navigate to that link. 



## Usage


``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```


## Built With
### Client
* [Vue.js](https://github.com/vuejs/vue) - JavaScript framework for building UI on the web.
* [D3.js](https://github.com/d3/d3) - bring data to life with SVG, Canvas and HTML.
* [Tone.js](https://github.com/Tonejs/Tone.js/) - a Web Audio framework for making interactive music in the browser
* [MQTT.js](https://github.com/mqttjs/MQTT.js) - The MQTT client for Node.js and the browser
* [Bootstrap](https://github.com/twbs/bootstrap) - HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.


## Contributing

Please contribute using [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). Create a feature branch, add commits, and [open a pull request].

## TODO

+ add ESLint
