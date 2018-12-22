$(document).ready(function () {
  // Get references to page elements

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveExample: function (example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/examples",
        data: JSON.stringify(example)
      });
    },
    getExamples: function () {
      return $.ajax({
        url: "api/examples",
        type: "GET"
      });
    },
    deleteExample: function (id) {
      return $.ajax({
        url: "api/examples/" + id,
        type: "DELETE"
      });
    }
  };


  // handleFormSubmit is called whenever we submit a new example

  // Initialize economy values

  let currentBalance = 1000;
  let startingBalance = 1000;
  let balanceSpent = 0;
  let netChange = 0;

  // Insert values into finance report 

  $("#currentBalance").text(currentBalance);
  $("#startingBalance").text(startingBalance);
  $("#balanceSpent").text(balanceSpent);
  $("#netChange").text(netChange);

  // Initialize functions for changing transTotal values


  let coin1 = 0;
  let coin2 = 0;
  let coin3 = 0;



  // On click buttons, execute function

  $("#minus1").click(function() {

    coin1--; 
    $("#transTotal1").text(coin1);

  });

  $("#plus1").click(function() {

    coin1++;
    $("#transTotal1").text(coin1);

  });

  $("#minus2").click(function() {

    coin2 --; 

    $("#transTotal2").text(coin2);

  });

  $("#plus2").click(function() {

    coin2 ++;
    $("#transTotal2").text(coin2);

  });

  $("#minus3").click(function() {

    coin3 --; 

    $("#transTotal3").text(coin3);

  });

  $("#plus3").click(function() {

    coin3 ++;
    $("#transTotal3").text(coin3);

  });



  // COIN BANK OBJECT

  let coinNames = [];

  let coinValues = [];

  // populate coinBank object on documentReady

  function namePopulate() {

    // check how many coins are on the page    

    $(".coinName").each(function(index) {
      console.log ( index + ": " + $(this).text() );

      let name = $(this).text();

      coinNames.push(name);

      console.log(coinNames);


      $("#nonsense").each(function(index) {

        console.log ( index + ": " + $(this).text() );
  
        let value = $(this).text();
  
        coinValues.push(value);
  
        console.log(coinValues);
  
  
      });


    });

    

  }



  namePopulate();
  const calculateTax = price => +(price * 1.08).toFixed(2)

  module.exports = calculateTax;

  // PURCHASE FUNCTION

  function buyCoins() {

    // For each coin

    // subtract price from current balance

    // add coin to coin bank

    // update curre
  }



  // MODAL INFO


  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("confirmTrans");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };


});
