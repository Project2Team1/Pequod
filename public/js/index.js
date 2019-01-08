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


  let coin0 = 0;
  let coin1 = 0;
  let coin2 = 0;



  // On click buttons, execute function

  $("#minus1").click(function() {

    coin0--; 
    $("#transTotal1").text(coin0);

  });

  $("#plus1").click(function() {

    coin0++;
    $("#transTotal1").text(coin0);

  });

  $("#minus2").click(function() {

    coin1 --; 

    $("#transTotal2").text(coin1);

  });

  $("#plus2").click(function() {

    coin1 ++;
    $("#transTotal2").text(coin1);

  });

  $("#minus3").click(function() {

    coin2 --; 

    $("#transTotal3").text(coin2);

  });

  $("#plus3").click(function() {

    coin2 ++;
    $("#transTotal3").text(coin2);

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


  // coin bank init

  let coinsArray = [];
  let coinsBank = [];

  console.log(coinsBank);
  console.log(coinsArray);


  // populate coinBank on boot

  function bankInit() {

    for (i = 0; i < coinNames.length; i++) {

      let name = coinNames[i];
      let value = coinValues[i];

      console.log(coinValues);
      

      let initDeposit = {
        name: name,
        value: value,
        number: 0
      };

      coinsBank.push(initDeposit);
    }

    console.log("bank init");
    console.log(coinsBank);
  }

  bankInit();


  // PURCHASE FUNCTION

  function buyCoins() {

    // For each coin

    for (i = 0; i < coinNames.length; i++) {

      let j = i + 1;

      let purchase = coinsBank[i].number ; 

      console.log(coinsBank[i].name);
      console.log("Old bank number: " + purchase);

      coinsBank[i].number = purchase + parseInt($("#transTotal" + j).text());

      console.log(coinsBank[i].number);



      // subtract coin price from current balance


    }

    for (i=0; i<coinNames.length; i++) {
      let j = i + 1;

      // change modal values

      $("#modalTotal" + j).text(0);
      $("#transTotal" + j).text(0);

      coin0 = 0;
      coin1 = 0;
      coin2 = 0;

      $("#bankTotal" + j).text(coinsBank[i].number);

      modal.style.display = "none";

    }

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

    for (i=0; i<coinNames.length; i++) {
      let j = i + 1;

      // change modal values

      let value = "#transTotal" + j;

      let purchaseNum = $(value).text();

      console.log(value);

      $("#modalTotal" + j).text(purchaseNum);

    }
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


  
  $("#finalTrans").click(function() {

    console.log("clicked!");
    buyCoins();

    console.log("Test",parseInt(coinsBank[0].number))

    var data = [{
      // values: [1, 2, 3],
      values: [parseInt(coinsBank[0].number),parseInt(coinsBank[1].number),parseInt(coinsBank[2].number)],
      labels: [coinsBank[0].name,coinsBank[1].name,coinsBank[2].name],
  
      // labels: ['Residential', 'Non-Residential', 'Utility'],
      colors:['#FEBFB3', '#E1396C', '#96D38C', '#D0F9B1'],
      type: 'pie'
    }];
    var layout = {
      autosize: false,
      width: 530,
      height: 500,
  
    
    };

    Plotly.newPlot('myDiv', data, layout, {showSendToCloud:true});


  });



  console.log("Thisone",coinNames);
  // Plotly graphs
  console.log("Test",parseInt(coinsBank[0].number))
  // var data = [{
  //   values: [1, 2, 3],
  //   // values: [parseInt(coinsBank[0].number),parseInt(coinsBank[1].number),parseInt(coinsBank[2].number)],
  //   labels: [coinsBank[0].name,coinsBank[1].name,coinsBank[2].name],

  //   // labels: ['Residential', 'Non-Residential', 'Utility'],
  //   // colors:['#FEBFB3', '#E1396C', '#96D38C', '#D0F9B1'],
  //   type: 'pie'
  // }];
  // var layout = {
  //   autosize: false,
  //   width: 530,
  //   height: 500,

  
  // };


  // Plotly.newPlot('myDiv', data, layout, {showSendToCloud:true});
  });