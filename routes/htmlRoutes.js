var db = require("../models");
const router = require("express").Router();

router.get("/", async function(req, res) {
    
  /* let examples = db.Example
    .findAll({}); */

  let coins = 
    db.CryptoCoin
      .findAll({});

 /*  let markets =
    db.CryptoMarket
      .findAll({}); */

  res.render("index", {
    coins   : await coins,
    // markets : await markets
  });

});

// Render 404 page for any unmatched routes
router.get("*", function(req, res) {
  return res.render("404");
});

module.exports = router;