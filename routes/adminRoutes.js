require("dotenv").config();
const router = require("express").Router();

router.route("/")

  .all((req, res, next) => {
    console.log("\n\t\t@routes/admin ALL on /admin\n\treq.body:\n", req.body, '\n\t.headers.authoriztion\n', req.headers.authorization);


    // console.log("auth ===", req.headers.authorization);
    if (req.headers.authorization === undefined) {
      //% When there is no attempt to provide authorization 
      //% This likely occurs when first accessing the page 
      //TODO: maybe change what responds
      return res.render('admin', { authorized: false });
    }

    if (req.headers.authorization !== process.env.AUTH_CHECK) {
      console.log("\t\t -- does not have a matching admin password");
      res.set('WWW-Authenticate', 'Basic realm="Administrator\'s Page"'); 
      return res.status(401).render('admin', { authorized: false });
    }
    console.log("\t\t -- does have a matching admin password");

    next();
    // const decode = Buffer.from(req.headers.authorization.split(' ')[1] || '', 'base64').toString('binary');
    // console.log("decode:\n", decode);
  })

  .get((req, res) => {
    console.log("\n\t\t@routes/admin GET on /admin, req.body:\n", req.body);
    return res.status(200).render('admin', { authorized: true });
  })

  .post((req, res) => {
    console.log("\n\t\t@routes/admin POST on /admin, req.body:\n", req.body);
    res.send("post admin page");
  })

;


module.exports = router;