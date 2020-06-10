const express = require('express');
const app = express();
const path = require('path');
const db = require('./models/db');
const five = require('johnny-five');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../build')));
five.Board().on('ready', () => {
  let led = new five.Led.RGB({
    pins: {
      red: 5,
      green: 9,
      blue: 6,
    },
  });
  led.on();
  led.color('#FF0000');
  wss.on('connection', (ws, req) => {
    console.log('connected');
    ws.on('message', (data) => {
      led.color('#' + data);
    });
  });
});
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./apiRoutes'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 1337;

db.sync({ force: true }).then(function () {
  app.listen(port, function () {
    console.log(`It's time to light the lights...`);
  });
});
