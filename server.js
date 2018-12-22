require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

const passport = require('passport');
const { Strategy } = require('passport-local');

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(require('cookie-parser')());

app.disable('x-powered-by');

passport.use(new Strategy(
  function (username, password, cb) {
    if (username !== 'admin') {
      return cb(null, false);
    }
    if (process.env.ADMIN_PW != password) {
      return cb(null, false);
    }

    return cb(null, true);
  }));

passport.serializeUser(function (user, cb) {
  cb(null, process.env.ADMIN_ID);
});

passport.deserializeUser(function (id, cb) {
  if (id !== process.env.ADMIN_ID) {
    cb(null, false);
  }
  cb(null, true);
});


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// Routes
require("./routes/apiRoutes")(app);
app.use("/admin", require("./routes/adminRoutes"));
app.use("/", require("./routes/htmlRoutes"));


var syncOptions = { force: false };
// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}



process.env.AUTH_CHECK = `Basic ${Buffer.from(`admin:${process.env.ADMIN_PW}`, 'binary').toString('base64')}`;


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
