require('dotenv').config();

const moment = require('moment');

const EventEmitter = require('events');
const sseEmitter = new EventEmitter();

const db = require("./../models");

const { getLatestQuotes } = require('./../private/cmcAPI');

//% emitter needs at least one listener for 'error' events or else a throw will exit Node process
sseEmitter.on('error', (err) => console.error("EventEmitter error\n", err));

if (process.env.SECONDS_TO_CALL >= 10) {
  setInterval(
    // setTimeout(
    async () => {
      let coins = 
        db.CryptoCoin
          .findAll({})
          .then(coinResults => coinResults.map(coin => coin.symbol));
  
      getLatestQuotes(await coins)
        .then(({ quotes } = {}) => {
          console.log("\n\n", quotes, "\n\n");
  
          // Object.entries(quotes).forEach( ([symbol, {quote}={}]) => {
          //   quotes[symbol] = quote.USD.price || 0; // replaces the (value) object associated with each symbol (key) to only its quote.USD.price
          // });
  
          quotes =
            {
               BTC: 4037.78993712  + Math.random() * 800 - 400,
               ETH: 153.145912577  + Math.random() *  30 -  15,
               LTC: 37.7778238441  + Math.random() *   8 -   4,
               XLM: 0.123514908275 + Math.random() * 0.0246 - 0.0123,
               XRP: 0.366287085377 + Math.random() * 0.0732 - 0.0366,
              DOGE: 0.0022845094675+ Math.random() * 0.0004 - 0.0002
            };
  
          const dataToEmit = {
            time: moment().format("MMM Do h:mm:ss a"),
            quotes,
            interval: process.env.SECONDS_TO_CALL
          };
  
          console.log(
            "emitting...",
            dataToEmit,
            sseEmitter.listenerCount('cmc'),
            sseEmitter.listeners('cmc'));
  
          sseEmitter.emit('cmc', 'latestQuotes', dataToEmit);
        })
  
        .catch(({ response, request, message } = {}) => {
          console.log("Error message caught from retrieving new CMC data\n\t", message);
        })
      ; // getLatestQuotes()
    },
  
    1000 * process.env.SECONDS_TO_CALL); // setInterval
}

module.exports = sseEmitter;