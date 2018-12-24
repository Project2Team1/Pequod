// #region NPM
require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
// #endregion NPM

// #region Local Modules
const passport = require("./config/passport");
const db = require("./models");
// #endregion Local Modules

const app = express();
app.disable('x-powered-by'); //% https://expressjs.com/en/advanced/best-practice-security.html#use-helmet

//* Middleware
app.use(
  express.urlencoded({ extended: false }),
  express.json(),
  express.static("public"),

  require("cookie-session")(
    {
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    }),
  
  passport.initialize(),
  passport.session()
);

//* View Engine
app.engine(
  "handlebars",
  exphbs({ defaultLayout: "main" })
);
app.set("view engine", "handlebars");

//* Routes
require("./routes/apiRoutes")(app);
app.use("/admin" , require("./routes/adminRoutes"));
app.use("/"      , require("./routes/htmlRoutes" ));


//* DB/Model Options
//% If running a test, set syncOptions.force to true, clearing the `testdb`
const syncOptions = { force: (process.env.NODE_ENV === "test") };


//* Sync and Listen!
const PORT = process.env.PORT || 3000;
db.sequelize.sync(syncOptions)
  .then(() => 
    app.listen(PORT, () => 
      console.log(`Listening on http://localhost:${PORT}`)));

// module.exports = app;