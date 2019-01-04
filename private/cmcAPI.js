// https://www.npmjs.com/package/axios

const axios = require("axios");
const url = "https://jsonplaceholder.typicode.com/posts/1";

//TODO: custom header, timeout

axios.get(url)

  .then(function ({data, status, statusText, headers, config}={}) {
    console.log(data);
  })

  .catch(function ({response, request, message, config}={}) {
    console.log("CMC GET error");
    //% https://www.npmjs.com/package/axios#handling-errors
    if (response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.log("data:\n\t", response.data);
      console.log("status:\n\t", response.status);
      console.log("headers:\n\t", response.headers);
    } else if (request) {
      // The request was made but no response was received
      // `request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log("\nrequest:\n\t", request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("\nError message:\n\t", message);
    }
    console.log("\nconfig:\n\t", config);
  });