$(document).ready(function () {

  // #region REALTIME Market Value Logic
  // Find and store DOM elements for real-time coin values
  let rtElements = {};
  document.querySelectorAll("#rtList .rtValue").forEach(ele => {
    rtElements[ele.dataset.id] = ele;
  });

  let updateTimer = { id: NaN };
  resetTimer(updateTimer);

  new EventSource('/stream')
    .addEventListener('latestQuotes',
      ({ data } = {}) => {
        data = JSON.parse(data);
        if (data && data.quotes) {
          resetTimer(updateTimer, +data.interval);
          Object.entries(data.quotes).forEach(([symbol, quote]) => {
            $(rtElements[symbol])
              .hide()
              .text(`$ ${quote.toFixed(4)}`)
              .fadeIn(1500);
          });
        }
      }
    );

  function resetTimer(timer, interval=10) {
    clearInterval(timer.id);
    const SECONDS_PER_UPDATE = interval;
    const UPDATE_INTERVAL_DIVISOR = 10; // update every half of a second
    let multOfSecsLeft = SECONDS_PER_UPDATE * UPDATE_INTERVAL_DIVISOR;

    timer.id = setInterval(() => {
      // Checking at top of this function to get a full, last interval
      if (multOfSecsLeft <= 0) {
        clearInterval(timer.id); // stop the timer
      }
      else {
        --multOfSecsLeft;

        let secondsLeft = (multOfSecsLeft / UPDATE_INTERVAL_DIVISOR);
        // If less than 10 seconds, display a single decimal digit
        $(timeUntilUpdate).text(
          (secondsLeft).toFixed(secondsLeft > 10 ? 0 : 1)
        );

        // Calculate the percentage of time remaining to update progress bar
        let percent = secondsLeft / SECONDS_PER_UPDATE * 100;
        $('.progress-bar')
          .css("width", `${percent}%`)
          .attr("aria-valuenow", percent);
      }
    }, 1000 / UPDATE_INTERVAL_DIVISOR); // seconds to update timer displays
  }
  // #endregion REALTIME Market Value Logic


  // #region Variables Setup
  const modal = document.getElementById("myModal");
  const iconSpin = document.getElementById("spinIcon");
  const transNetEl = document.getElementById('transNetMsg');
  const feedbackEl = document.getElementById('feedbackMsg');  

  //* Initialize economy values
  let startingInvestment = 5000;
  let availableCash = startingInvestment;
  let coinBankValue = 0;
  let transMade = 0;
  let totalValue = availableCash + coinBankValue;

  let transNet = 0;

  //* Construct object for coins state
  let coins = {};
  /* example structure
  {
    BTH: {
      value,
      trans: {valueEl, qty, qtyEl, upEl, downEl, percentEl},
      modal: {valueEL, qtyEl},
      bank:  {valueEl, qty, qtyEl}
    ETH: {...},
    ...
  } */ 

  // Value & Transaction Panel elements 
  document.querySelectorAll("#transactionPanel li[data-id]")
    .forEach(node => {
      coins[node.dataset.id] = {

        value: 0,
        
        trans: {
          valueEl: node.querySelector(".value"),
          
          quantity  : 0,
          quantityEl: node.querySelector(".qty"),

          percentEl    : node.querySelector(".percentage"),
          upPercentEl  : node.querySelector(".upPercent"),
          downPercentEl: node.querySelector(".downPercent")
        }
      };
    });
  
  // Modal elements
  document.querySelectorAll("#myModal li[data-id]")
    .forEach(node => {
      coins[node.dataset.id].modal = {
        valueEl   : node.querySelector(".value"),
        quantityEl: node.querySelector(".qty")
      };
    });
  // Bank elements & quantity
  document.querySelectorAll("#coinBank li[data-id]")
    .forEach(node => {
      coins[node.dataset.id].bank = {
        valueEl   : node.querySelector(".value"),

        quantity  : 0,
        quantityEl: node.querySelector(".qty")
      };
    });

  // console.log(coins);
  // #endregion Variable Setup


  //* One-off DOM elements
  $("#startingInvestment").text(startingInvestment);
  

  // #region Utility Functions

  function updateReport() {
    coinBankValue = Object.values(coins).reduce(
      (acc, currCoin) => 
        acc + (currCoin.value * currCoin.bank.quantity)
      , 0); // .reduce

    totalValue = coinBankValue + availableCash;

    $("#availableCash").text(availableCash);
    $("#coinBankValue").text(coinBankValue);
    $("#transMade").text(transMade);
    $("#totalValue").text(totalValue);
  }

  function setNewValues() {

    Object.values(coins).forEach( coin => {
      let rnd = Math.floor(Math.random() * 500) + 50;

      if (coin.value) {
        const per = Math.abs(coin.value - rnd)/coin.value * 100;
        $(coin.trans.percentEl).text(`${per.toFixed(2)}%`);

        if (coin.value > rnd) { // Percentage loss
          $(coin.trans.downPercentEl).show();
          $(coin.trans.upPercentEl).hide();
        }
        else { // Price Percentage Gain
          $(coin.trans.downPercentEl).hide();
          $(coin.trans.upPercentEl).show();
        }
      }

      coin.value = rnd;
      $(coin.trans.valueEl)
        .hide()
        .text(rnd)
        .fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(400).fadeIn(400);

      coin.modal.valueEl.textContent = rnd;
      coin.bank .valueEl.textContent = rnd;
    });

    console.log(coins);
  }

  function buyCoins() {
    transMade++;

    transNet=0; updateTransNet();

    let transactionTotal = 0;

    Object.values(coins).forEach(coin => {
      transactionTotal += coin.value * coin.trans.quantity;

      coin.bank.quantity += coin.trans.quantity;
      coin.bank.quantityEl.textContent = coin.bank.quantity;
    });

    if (transactionTotal > availableCash) {
      console.log("Purchase failed! Not enough cash.", transactionTotal, availableCash);
      return alert("You can't spend money you don't have! Try again.");
    }

    Object.values(coins).forEach(coin => {
      coin.trans.quantity = 0;
      coin.trans.quantityEl.textContent = 0;
    });

    availableCash -= transactionTotal;
    
    setNewValues();
    updateReport();
  }

  function makePieChart() {

    var data = [{
      values: Object.values(coins).map(coin => coin.value * coin.bank.quantity),

      labels: Object.keys(coins),

      colors: ['#FEBFB3', '#E1396C', '#96D38C', '#D0F9B1'],
      textinfo: 'label+percentvalue+value',

      marker: {
        colors: [
          'rgb(20, 55, 112)', 
          'rgb(16, 88, 206)', 
          'rgb(3, 27, 66)', 
          'rgb(2, 97, 249)', 
          'rgb(114,147,203)',
          'rgb(125, 170, 242)'
        ],

        line: {
          color: '#FFFFFF',
          width: 8
        }
      },
      type: 'pie',
    }];

    var layout = {
      // autosize: true,
      width: document.getElementById("myDiv").scrollWidth - 20,
      // height: 500,
      showlegend: false,
      paper_bgcolor: '#F0F0F0',
      background: ('rgb(2, 97, 249)'),
    };

    Plotly.newPlot('myDiv', data, layout, { showSendToCloud: true, responsive: false });
  }

  function updateTransNet() {
    if (transNet > 0) {
      transNetEl.innerHTML = `This transaction will <strong>cost $ ${transNet}</strong> from your Available Cash.`;
    }
    else if (transNet < 0) {
      transNetEl.innerHTML = `This transaction will <strong>credit ($ ${-transNet})</strong> to your Available Cash.`;
    }
    else {
      transNetEl.innerHTML = "";
    }
  }
  // #endregion Utility Functions
  
  
  // #region Click Handlers
  $(".minus").click(function() {
    const { value, trans, bank } = coins[this.dataset.id];

    let qty = trans.quantity;
    let inBank = bank.quantity;
    if (qty <= -inBank){ return; }

    transNet -= value; updateTransNet();
    
    trans.quantityEl.textContent =
      --trans.quantity;
  });

  $(".plus").click(function() {
    const { value, trans } = coins[this.dataset.id];

    

    if (transNet + value > availableCash ) {

      $(feedbackEl)
        .stop(true)
        .fadeOut()
        .text('You do not have enough Available Cash to buy that coin. Try selling coins to get more cash.')
        .fadeIn(300).fadeOut(200).fadeIn(300)
        .fadeOut(10000);

      return;
    }

    transNet += value;
    updateTransNet();

    trans.quantityEl.textContent =
      ++trans.quantity;
  });

  // User clicks the button that opens the modal 
  document.getElementById('confirmTrans').onclick = function () {
    // Copy the quantities from transaction
    Object.values(coins).forEach(({ modal, trans }) => {
      let buySell = "";
      if (trans.quantity > 0) { buySell="Buy" ; }
      if (trans.quantity < 0) { buySell="Sell"; }

      modal.quantityEl.textContent = `${buySell} ${Math.abs(trans.quantity)}`;
    });

    iconSpin.classList.add('fa-spin');
    setTimeout(() => {
      iconSpin.classList.remove('fa-spin');
      modal.style.display = "block";
    }, 1200);

  };
  
  document.getElementById("finalTrans").onclick = function () {

    buyCoins();
    modal.style.display = "none";

    makePieChart();
  };

  //* MODAL INFO
  // When the user clicks on <span> (x), close the modal
  document.getElementsByClassName("close")[0].onclick = function() {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  // #endregion Click Handlers


  // #region START OF EXECUTION
  setNewValues(); // Initialize coins with random values and
  updateReport();
  makePieChart();
  // #endregion START OF EXECUTION
  
});