var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples,
        coins: [
          { name: "Bitcoin" , symbol: "btc", value: 123 },
          { name: "Ethereum", symbol: "eth", value: 456 },
          { name: "Stellar" , symbol: "xlm", value: 789 }
        ],
        markets: [
          { name: "coinbase" },
          { name: "eToro"    },
          { name: "Kraken"   }
        ]
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
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
