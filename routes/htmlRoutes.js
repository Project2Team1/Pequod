const router = require("express").Router();

const { CryptoCoin } = require("../models");


//* Home Page
router.get("/", async (req, res) => {
    
  let coins = 
    CryptoCoin
      .findAll({});

 /*  let markets =
    db.CryptoMarket
      .findAll({}); */

  res.render("index", {
    coins   : await coins,
    // markets : await markets
  });

});


//* Render 404 Page for any unmatched routes
router.get("*", (req, res) => res.render("404"));


module.exports = router;