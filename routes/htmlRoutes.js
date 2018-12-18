var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", async function(req, res) {
    
    let examples = db.Example
      .findAll({});

    let coins = 
      db.CryptoCoin
        .findAll({})
        .then(coinResults => coinResults.map(coin => { coin.value=123; return coin; }));

    let markets =
      db.CryptoMarket
        .findAll({});

    res.render("index", {
      msg     : "Welcome!",
      examples: await examples,
      coins   : await coins,
      markets : await markets
    });

    // db.CryptoCoin.findAll({}).then(findAllCryptoCoinResults => {
    //   findAllCryptoCoinResults.forEach( (coin, index) => {
    //     console.log(index);
    //     for (k in coin) {
    //       console.log(k);
    //     }
    //   });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example
      .findOne({ where: { id: req.params.id } })
      .then(function(dbExample) {
        res.render("example", {
          example: dbExample
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
