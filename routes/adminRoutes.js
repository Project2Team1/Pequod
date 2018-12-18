require("dotenv").config();

module.exports = function (app) {

  app.route("/admin")
    .all((req, res, next) => {
      console.log("\t\t@routes/admin ALL on /admin, req.body:\n", req.body);
      if (req.body.password === undefined || req.body.password !== process.env.ADMIN_PW) {
        console.log("\t\t -- does not have a matching admin password");
      }
      next();
    })
    .get((req, res) => {
      console.log("\t\t@routes/admin GET on /admin, req.body:\n", req.body);
    })
    .post((req, res) => {
      console.log("\t\t@routes/admin POST on /admin, req.body:\n", req.body);

      if (req.body.password === undefined || req.body.password !== process.env.ADMIN_PW) {
        console.log("\t\t-- noteq pw");
        return res.status(200).end();
      }
      else {
        console.log("\t\t-- equal pw");
        return res.status(500).end();
      }
    });

};
