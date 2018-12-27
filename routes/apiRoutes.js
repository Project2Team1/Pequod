/* eslint-disable no-unused-vars */

const router = require('express').Router();

const db = require('../models');
const { isAuthenticated } = require('./middleware');


router.use(
  require('morgan')('dev'),

  (req, res, next) => {
    console.log(`\n\t\t@routes/api ${req.method.toUpperCase()} on ${req.baseUrl}${req.path} (${req.originalUrl})`);
    next();
  }
);

router.post('/coin', 
  //* Authenticate check
  isAuthenticated,

  //* with ERRORS = NOT Authenticated
  (err, req, res, _next) => {
    console.log("Authentication error:\n", err);
    return res.status(401).end();
  },

  //* WITHOUT errors = Authenticated
  (req, res, _next) => {
    // console.log("req.body:\n", req.body);
    db.CryptoCoin
      .create(req.body)

      .then(dbCryptoCoin => res.status(201).json(dbCryptoCoin))

      .catch( error => {
        console.log("Create Coin, catch error:\n", error);

        //% Validation & Unique errors are 400 Bad Request
        res.status(400);
        if (error.name === 'SequelizeUniqueConstraintError') {
          const {type, path} = error.errors[0];
          return res.json({type, path});
        }
        else if (error.name === 'SequelizeValidationError') {
          return res.json(error);
          // return res.json(error.errors[0].message);
        }

        //% Other errors as 500 Internal
        return res.status(500);

      });
  }
);

module.exports = router;


/* module.exports = function(app) {

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example
      .findAll({})
      .then(function(dbExamples) {
        res.json(dbExamples);
      });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example
      .create(req.body)
      .then(function(dbExample) {
        res.json(dbExample);
      });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example
      .destroy({ where: { id: req.params.id } })
      .then(function(dbExample) {
        res.json(dbExample);
      });
  });

};
 */