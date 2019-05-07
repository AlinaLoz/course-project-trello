require('dotenv').config();
const express = require("express");
const socket = require('socket.io');
const cors = require('express-cors');
const bodyParser = require("body-parser");
const app = express();
const http = require('http');
const bearerToken = require('express-bearer-token');
const services = require('./services');

const socketMap = {};
global.appServises = new services();
global.socketMap = socketMap;

const server = http.createServer(app);
const socketIO = socket.listen(server);

app.use(cors({allowedOrigins: ['localhost:3000']}));
app.use(bearerToken());
app.use(bodyParser.json());

require('./routes/REST')(app);

socketIO.on('connection', (socket) => {
  // console.log('socket is working', socket.handshake.query);
  if (!socketMap[socket.handshake.query.token]) {
    socketMap[socket.handshake.query.token] = [];
  }
  socketMap[socket.handshake.query.token].push(socket);
  require('./routes/Socket')(socket);
});

server.listen(8000, () => {
  console.log('server is working');
});
