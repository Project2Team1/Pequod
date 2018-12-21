require("dotenv").config();
const router = require("express").Router();


router.route("/")

  .all((req, res, next) => {
    console.log("\t\t@routes/admin ALL on /admin, req.body:\n", req.body);


    // -----------------------------------------------------------------------
    // authentication middleware

    const auth = { password: 'yourpassword' }; // change this

    // parse login and password from headers
    console.log("auth ===", req.headers.authorization);
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    console.log("b64?", b64auth);
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');
    console.log("log/pw", login, password);

    // Verify login and password are set and correct
    if (!login || !password || password !== auth.password) {
      // res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
      res.status(401).send('Authentication required.'); // custom message
      return;
    }

    next();




  /*   if (req.body.password === undefined || req.body.password !== process.env.ADMIN_PW) {
      console.log("\t\t -- does not have a matching admin password");
      return res.send("Unauthorized").status(401).end();
    }

    console.log("\t\t -- does have a matching admin password");

    next(); */
  })

  .get((req, res) => {
    console.log("\t\t@routes/admin GET on /admin, req.body:\n", req.body);
    res.send("get admin page");
  })

  .post((req, res) => {
    console.log("\t\t@routes/admin POST on /admin, req.body:\n", req.body);
    res.send("post admin page");
  })

  ;


module.exports = router;