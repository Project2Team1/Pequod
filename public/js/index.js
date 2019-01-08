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
  let transMade = 0;

  // Insert values into finance report 

  function setReport() {

    $("#currentBalance").text(currentBalance);
    $("#startingBalance").text(startingBalance);
    $("#balanceSpent").text(balanceSpent);
    $("#transMade").text(transMade);



  }

  function setBankValues() {

    for (i=0; i< coinNames.length; i++) {
      let j = i + 1;

      $("#bankValue" +j).text($("#coinValue" +j).text())

      console.log($("coinValue" +j).text());

    }
  }

  
  setReport();

  // Initialize functions for changing transTotal values


  let coin0 = 0;
  let coin1 = 0;
  let coin2 = 0;
  let coin3 = 0;
  let coin4 = 0; 
  let coin5 = 0;







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

  $("#minus4").click(function() {

    coin3 --; 

    $("#transTotal4").text(coin3);

  });

  $("#plus4").click(function() {

    coin3 ++;

    $("#transTotal4").text(coin3);

  });

  $("#minus5").click(function() {

    coin4 --; 

    $("#transTotal5").text(coin4);

  });

  $("#plus5").click(function() {

    coin4 ++;

    $("#transTotal5").text(coin4);

  });

  $("#minus6").click(function() {

    coin5 --; 

    $("#transTotal6").text(coin5);

  });

  $("#plus6").click(function() {

    coin5 ++;

    $("#transTotal6").text(coin5);

  });

  




  // COIN BANK OBJECT

  let coinNames = [];

  let coinValues = [];

  let k = 1;

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

        
        $("#coinValue" + k).text(Math.floor(Math.random() * 500) + 50 );

  
        let value = $("#coinValue" +k).text();

        console.log("Value: " + value);
  
        coinValues.push(value);
  
        console.log(coinValues);

        k++;

  
      });


    });

    

  }



  namePopulate();


  // coin bank init

  let coinsArray = [];
  let coinsBank = [];


  function setNewValues() {

    for (i=0; i < coinNames.length; i++) {
      let j = i + 1;

      coinsBank[i].value = Math.floor(Math.random() * 500) + 50;

      console.log(coinsBank[i].name, coinsBank[i].value);

      $("#coinValue" +j).text(coinsBank[i].value);
      $("#bankValue" +j).text(coinsBank[i].value);
      $("#modalValue" +j).text(coinsBank[i].value);
    }
  }

  console.log(coinsBank);
  console.log(coinsArray);


  // populate coinBank on boot

  function bankInit() {

    for (i = 0; i < coinNames.length; i++) {

      let name = coinNames[i];

      let j = i+1;
      

      let initDeposit = {
        name: name,
        value: parseInt($("#coinValue" +j).text()),
        number: 0
      };

      coinsBank.push(initDeposit);

      console.log("test: " + initDeposit.value);


    }

  }

  bankInit();

  let days = 1;

  // Advance time function

  function advanceTime() {

    days++;

    console.log(days);

    for (i = 0; i < coinNames.length; i++) {

      console.log(coinsBank[i].value);

    }
  }


  // PURCHASE FUNCTION

  function buyCoins() {

    

    
    transMade++;


    // for each coin

    for (i = 0; i < coinNames.length; i++) {

      let j = i + 1;

      let purchase = coinsBank[i].number ; 

      coinsBank[i].number = purchase + parseInt($("#transTotal" + j).text());




      // subtract coin price from current balance
      

      // value of the coin

      let purPrice = coinsBank[i].value;

      // store value of number of coins to be bought/sold

      let buyOrSell = parseInt($("#transTotal" + j).text());

      console.log("BoS: " + buyOrSell);

      console.log(purPrice);



      // if buying

      if (buyOrSell > 0) {

        console.log("buying");

        let purTotal = purPrice * buyOrSell;

        if (currentBalance >= Math.abs(purTotal)) {

          // multiply purchase price by number of coins purchased

          // add purchase price to balance spent

          balanceSpent = balanceSpent + purTotal;

          // subtract purchase price from current balance
          currentBalance = currentBalance - purTotal;

        }else {
          console.log("Purchase failed! Not enough cash.");

          alert("You can't spend money you don't have! Try again.")
        }

        
      }else if (buyOrSell === 0) {
        console.log("zero!");

      }else {

        if (coinsBank[i].number >= Math.abs(buyOrSell)) {

          let purTotal = purPrice * buyOrSell;

          console.log("selling");
          console.log("purchase total: " + purTotal);
          currentBalance = currentBalance - purTotal;

        }else {
          console.log("sale failed! Not enough coins");

          alert("You can't sell coins you don't have! Try again.");
        }
      }

      setReport();
      setBankValues();
      setNewValues();



    }

    for (i=0; i<coinNames.length; i++) {
      let j = i + 1;

      // change modal values

      $("#modalTotal" + j).text(0);
      $("#transTotal" + j).text(0);

      coin0 = 0;
      coin1 = 0;
      coin2 = 0;
      coin3 = 0;
      coin4 = 0;
      coin5 = 0;

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

      // change purchase numbers

      let value = "#transTotal" + j;

      let purchaseNum = $(value).text();

      $("#modalTotal" + j).text(purchaseNum);

      // Change coin values

      $("#modalValue" +j).text($("#coinValue" +j).text());

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
      values: [parseInt(coinsBank[0].number),parseInt(coinsBank[1].number),parseInt(coinsBank[2].number),
      parseInt(coinsBank[3].number),parseInt(coinsBank[4].number),parseInt(coinsBank[5].number)],
      labels: [coinsBank[0].name,coinsBank[1].name,coinsBank[2].name,coinsBank[3].name,coinsBank[4].name,coinsBank[5].name],
  
      // labels: ['Residential', 'Non-Residential', 'Utility'],
      colors:['#FEBFB3', '#E1396C', '#96D38C', '#D0F9B1'],
      textinfo: 'label+percentvalue+value',
    
        marker: {
          colors: ['rgb(20, 55, 112)', 'rgb(16, 88, 206)', 'rgb(3, 27, 66)', 'rgb(2, 97, 249)', 'rgb(114,147,203)','rgb(125, 170, 242)'], 
        line: {
          color: '#FFFFFF', 
          width: 8
        }
      },
        type: 'pie'
      }];
    var layout = {
      autosize: false,
      // width: 1000,
      height: 500,
      showlegend: false,
      paper_bgcolor: '#F0F0F0',
      background:('rgb(2, 97, 249)'),
      
      margin: {
        l: 50,
        r: 50,
        b: 100,
        t: 100,
        pad: 4
      },
  
    
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