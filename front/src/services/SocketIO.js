import io from 'socket.io-client';
import CookieParser from "./CookieService";
const URL = 'localhost:8000';

var socket = null;

(function () {
  socket = io.connect(URL, {query: `token=${CookieParser.getCookie('token')}&id=${CookieParser.getCookie('id')}`});
})();

const disconnect = () => {
  socket.disconnect(() => {
    socket = null;
  });
};

const emit = (event, data) => {
  return new Promise((resolve, reject) => {
    if (!socket) return reject('socket has been disconnected');
    socket.emit(event, {...data, id: CookieParser.getCookie('id'), token: CookieParser.getCookie('token')});
  });
};

const on = (event, cb) => {
  return new Promise( (resolve, reject) => {
    if (!socket) return  reject('socket has been disconnected');
    socket.on(event, (response) => cb(response));
  });
};

export {disconnect, on, emit};