var jwt = require("jsonwebtoken");
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    jwt.verify(token, supersecret, function(err, decoded) {
      if (err) res.status(401).send({ message: err.message });
      else {
        //everything is awesome

        req.user_id = decoded.user_id;
        next();
      }
    });
  }
}
module.exports = userShouldBeLoggedIn;
