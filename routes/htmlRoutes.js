var db = require("../models");
const router = require("express").Router();

router.get("/", async function(req, res) {
    
  /* let examples = db.Example
    .findAll({}); */

  let coins = 
    db.CryptoCoin
      .findAll({})
      .then(coinResults => coinResults.map(coin => { 
        coin.value = 123;
        return coin; }));

 /*  let markets =
    db.CryptoMarket
      .findAll({}); */

  res.render("index", {
    msg     : "Welcome!",
    coins   : await coins,
    // examples: await examples,
    // markets : await markets
  });

  // db.CryptoCoin.findAll({}).then(findAllCryptoCoinResults => {
  //   findAllCryptoCoinResults.forEach( (coin, index) => {
  //     console.log(index);
  //     for (k in coin) {
  //       console.log(k);
  //     }
  //   });
});


router.get("/test", (req, res)=>{
  res.render("sseTest",{});
});


// Render 404 page for any unmatched routes
router.get("*", function(req, res) {
  return res.render("404");
});

module.exports = router;

 /*  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example
      .findOne({ where: { id: req.params.id } })
      .then(function(dbExample) {
        res.render("example", {
          example: dbExample
        });
      });
  }); */
