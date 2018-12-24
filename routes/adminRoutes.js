/* eslint-disable no-unused-vars */

require("dotenv").config();
const router = require("express").Router();
const passport = require("./../config/passport");


router.use(
  require('morgan')('dev'),

  //* custom message log
  (req, res, next) => {
    console.log(`\n\t\t@routes/admin ${req.method.toUpperCase()} on ${req.baseUrl}${req.path} (${req.originalUrl})`);
    next();
  },

  //* No Cache
  (req, res, next) => {
    res.append('Surrogate-Control', "no-store");
    res.append('Cache-Control', "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.append('Pragma', "no-cache");
    res.append('Expires', "0");

    next();
  }
);


router.get("/", 
  (req, res) =>
    res
      .status(200)
      .render('admin', { authorized: req.user }));


router.get('/logout', (req, res) => {
  req.logout();
  return res.redirect('.');
});


router.post('/login', 
  //* Logout any current
  (req, res, next) => {
    req.logout();
    next();
  },

  //* Pre-Authenticate (build req.body)
  (req, res, next) => {
    console.log("\tPOST req.body:\n", req.body);
    if (!req.body || !req.body.pw_input) { next("No request body with password from POST"); }
    req.body.username = process.env.ADMIN_ID;
    req.body.password = req.body.pw_input;
    next();
  },

  //* Authenticate check
  (req, res, next) => {
    passport.authenticate(
      'local', 
      // { session: false },
      (error, user, info) => {
        console.log('auth return:', error, user, info);

        if (error) {
          console.log("Authentication error:\n", error);
          return next({ error, info });
        }

        if (!user) {
          console.log("Authentication, no user object, info:\n", info);
          return next();
        }

        req.login(user, (err) => {
          if (err) { return next(err); }
          return next();
        });
      })(req, res, next);
  },

  //* Post-Authenticate check - with ERRORS
  (err, req, res, _next) => {
    console.log('post-auth, err:\n', err);
    return res.status(500).end();
  },

  //* Post-Authenticate check - WITHOUT errors
  (req, res, _next) => {
    // if (!req.user) {
    //   return res.status(401).end();
    // }
    //? Better just to refresh/redirect, instead of 401?
    //? Case: while currently admin, but then trying to login POST with BAD credentials
    //? only 401'ing the response would still show current page with admin sections, eventhough they just tried bad credentials

    return res.redirect('.');
  }
); //router.post('/login',


module.exports = router;