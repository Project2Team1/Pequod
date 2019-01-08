require('dotenv').config();

//% https://coinmarketcap.com/api/documentation/v1
const cmcAPI = require('axios').create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency',
  headers: { 'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY },
  timeout: 1000 * 20
});

module.exports = {
  getLatestQuotes(coinsArray) {
    // return cmcAPI.get('/info',
    //   {
    //     params: {
    //       symbol: coinsArray.toString()
    //     }
    //   })
    return cmcAPI.get('/quotes/latest',
      {
        params: {
          symbol: coinsArray.toString()
        }
      })

      .then(({ data, status, statusText, headers, config } = {}) => {
        // console.log(status, statusText, headers, config);

        return {quotes: data.data}; //% check documentation link at top (or postman examples) for response structure
      })

      .catch(({ response, request, message, config } = {}) => {
        console.log("CMC GET error");
        if (response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.log("   data:\n\t", response.data   );
          console.log(" status:\n\t", response.status );
          console.log("headers:\n\t", response.headers);
        } else if (request) {
          // The request was made but no response was received
          // request is an instance of http.ClientRequest in node.js
          console.log("\nrequest:\n\t", request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log("\nError message:\n\t", message);
        }
        console.log("\nconfig:\n\t", config);

        throw { response, request, message };
      }); // return require('axios')
  } 
};