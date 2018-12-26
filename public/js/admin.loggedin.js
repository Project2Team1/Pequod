$(document).ready(function () {

  const $ID = {
    newCoin_form       ,
    newCoin_inputName  ,
    newCoin_inputSymbol
  };

  Object.keys($ID).forEach(key => {
    $ID[key] = $(`#${key}`);
  });
  // console.log($ID);

  $ID.newCoin_form.submit( function(event) {
    event.preventDefault();

    this.classList.remove('was-validated');

    let name  = $ID.newCoin_inputName  .val().trim();
    let symbol= $ID.newCoin_inputSymbol.val().trim().toUpperCase();

    $ID.newCoin_inputName  .val(name  );
    $ID.newCoin_inputSymbol.val(symbol);

    if (
      this.checkValidity() === false
      || !name
      || !/^[A-Z]{2,5}$/.test(symbol)
    ) {
      this.classList.add('was-validated');
      return false;
    }

    $.post("/api/coin", {name, symbol})
      .then((...args) => {
        console.log(args.length, "post results:", ...args);
        //TODO: success feedback
        this.reset();
        $(this).find("[autofocus]").focus();
        // location.reload();
      })
      .catch( (...args) => {
        console.log(args.length, "err results:", ...args);
        //TODO: error feedback
        // this.reset(); // reset the input form
      });
  });

});
