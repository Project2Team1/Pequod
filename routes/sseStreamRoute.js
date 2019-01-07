const router = require('express').Router();

const sseEmitter = require('./../private/sseEmitter');

let mostRecentQuote = null;

router.use(
  require('morgan')('dev'),

  //* custom message log
  (req, res, next) => {
    console.log(`\n\t\t@routes/stream ${req.method.toUpperCase()} on ${req.baseUrl}${req.path} (${req.originalUrl})`);
    next();
  },

  //* SSE headers
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

  const resWriteCB = (event, data) => {
    mostRecentQuote = data;
    setImmediate(() => { // lets listeners be called async 
      res.write(
        [
          "event: " + String(event),
          "data: " + JSON.stringify(data),
          "\n"
        ].join('\n')); //% https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format
    });
  };

  // provide most recent quote on first GET access
  resWriteCB('latestQuotes', mostRecentQuote);

  // listen for new quotes emitted
  sseEmitter.on('cmc', resWriteCB);

  // stop the listener if client stops connection
  req.on('close', () => {
    // console.log('closing');
    sseEmitter.off('cmc', resWriteCB);
    res.end();
  });

});


module.exports = router;