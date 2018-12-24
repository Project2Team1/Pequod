$(document).ready(function () {

  const JQ_IDs = {
    addCoin_form,
  };

  Object.keys(JQ_IDs).forEach(key => {
    JQ_IDs[key] = $(`#${key}`);
  });
  // console.log(JQ_IDs);

  JQ_IDs.addCoin_form.submit(function (event) {
    event.preventDefault();

    this.classList.remove('was-validated');

    console.log($(this).find("input[name='name']"));
    console.log($(this).find("input[name='symbol']"));

    if (this.checkValidity() === false) {
      this.classList.add('was-validated');
      return false;
    }

    let formObj = $(this).serializeArray().reduce((prevObj, { name, value }) => Object.assign({ [name]: value }, prevObj), {});
    console.log(formObj);

    $.post("/api/coin", formObj)
      .then((...args) => {
        console.log(args.length, "post results:", ...args);
        location.reload();
      })
      .catch( (...args) => {
        console.log(args.length, "err results:", ...args);
        this.reset(); // reset the input form
      });
  });

});
