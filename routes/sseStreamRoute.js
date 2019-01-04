//% http://bayn.es/real-time-web-applications-with-server-sent-events-pt-1/
//% https://stackoverflow.com/questions/34657222/how-to-use-server-sent-events-in-express-js
//% https://nodejs.org/api/events.html#events_class_eventemitter
//% https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events


const EventEmitter = require('events');
const express = require('express');
const app = express();

const Stream = new EventEmitter(); // my event emitter instance

app.get('/stream', function (request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  Stream.on("push", function (event, data) {
    response.write("event: " + String(event) + "\n" + "data: " + JSON.stringify(data) + "\n\n");
  });
});

setInterval(function () {
  Stream.emit("push", "test", { msg: "admit one" });
}, 10000);
