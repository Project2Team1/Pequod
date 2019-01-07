$(document).ready(function () {

  const $ID = {
    newCoin_form       ,
    newCoin_inputName  ,
    newCoin_inputSymbol,
    newCoin_img
  };

  Object.keys($ID).forEach(key => {
    $ID[key] = $(`#${key}`);
  });


  $ID.newCoin_inputSymbol.on('input', function() {
    this.value = this.value.trim().toUpperCase();

    const symbol = this.value;
    if (/^[A-Z]{2,5}$/.test(symbol)) {
      this.setCustomValidity('');
      $ID.newCoin_img
        .one("error", function() {
          $(this).attr({src: './../images/cryptocurrency-icons/generic@2x.png'});
        })
        .attr({src: `./../images/cryptocurrency-icons/${symbol}@2x.png`});
    }
    else {
      $ID.newCoin_img.attr({src: null});
    }
  });


  $ID.newCoin_form.submit( function(event) {
    event.preventDefault();

    this.classList.remove('was-validated');

    let name   = $ID.newCoin_inputName  .val().trim();
    let symbol = $ID.newCoin_inputSymbol.val().trim().toUpperCase();

    $ID.newCoin_inputName  .val(name  );
    $ID.newCoin_inputSymbol.val(symbol);

    if ( !this.checkValidity()
      || !name
      || !/^[A-Z]{2,5}$/.test(symbol)) {
      this.classList.add('was-validated');
      return false;
    }

    $.post("/api/coin", {name, symbol})

      .then((...args) => {
        // console.log(args.length, "post results:", ...args);
        //TODO: success feedback
        this.reset();
        $ID.newCoin_img.attr({src: null});
        $(this).find("[autofocus]").focus();
      })

      .catch( ({status, responseJSON: {type="", path}={}}={}, textStatus, error) => {
        // console.log(status, type, path, textStatus, error);
        if (status === 400 && type.includes("unique")) {
          //TODO: error feedback - uniqueness
          console.log(`Coin with that '${path}' already exists.`);
        }
        else {
          //TODO: misc error feedback
        }
      });

  });

});
