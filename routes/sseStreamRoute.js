const router = require('express').Router();

const EventEmitter = require('events');
const Stream = new EventEmitter();

const moment = require('moment');


router.use(
  require('morgan')('dev'),

  //* custom message log
  (req, res, next) => {
    console.log(`\n\t\t@routes/stream ${req.method.toUpperCase()} on ${req.baseUrl}${req.path} (${req.originalUrl})`);
    next();
  },

  (req, res, next) => {
    res.set({
      'Content-Type' : 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection'   : 'keep-alive'
    });

    next();
  }
);


router.get('/', (req, res) => {
  res.status(200);
  
  const callback = (event, data) => {
    res.write(
      [
        "event: " + String(event),
        "data: " + JSON.stringify(data),
        "\n"
      ].join('\n')); //% https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format
  };

  Stream.on('push', callback);

  req.on('close', function() {
    console.log('closing');
    Stream.off('push', callback);
    res.end();
  });
});

setInterval(function () {
  const t = moment().format("MMM do h:mm:ss a");
  console.log("emitting...", t, Stream.listenerCount('push'), Stream.listeners('push'));

  Stream.emit("push", "test", { msg: t });
}, 5678);


module.exports = router;