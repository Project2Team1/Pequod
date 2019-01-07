const moment = require('moment');

const EventEmitter = require('events');
const sseEmitter = new EventEmitter();

const { getLatestQuotes } = require('./../private/cmcAPI');

//% emitter needs at least one listener for 'error' events or else a throw will exit Node process
sseEmitter.on('error', (err) => console.error("EventEmitter error\n", err));

// setInterval(
setTimeout(
  () => {
    getLatestQuotes()
      .then( ({quotes}={} ) => {
        console.log("\n\n", quotes, "\n\n");

        Object.entries(quotes).forEach( ([symbol, {quote}={}]) => {
          quotes[symbol] = quote.USD.price || 0; // replaces the (value) object associated with each symbol (key) to only its quote.USD.price
        });

        const payload = {
          time: moment().format("MMM Do h:mm:ss a"),
          quotes
        };

        console.log(
          "emitting...",
          payload,
          sseEmitter.listenerCount('cmc'),
          sseEmitter.listeners('cmc'));

        sseEmitter.emit('cmc', 'latestQuotes', payload);
      })

      .catch( ({ response, request, message }={} ) => {
        console.log("Error message caught from retrieving new CMC data\n\t",  message);
      })
    ; // getLatestQuotes()
  },

  5678); // setInterval

module.exports = sseEmitter;