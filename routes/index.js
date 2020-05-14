var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// /* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("We are live!");
});

router.post("/register,", async (req, res, next) => {
  console.log("inside");
  console.log(req.body);
  res.status(200).send("Done");

  // try {
  //   let results = await db(
  //     `INSERT INTO users (first_name, last_name, email, sport, level, resorts, password ) VALUES ("${req.body.first_name}", "${req.body.last_name}", "${req.body.email}", "${req.body.sport}", "${req.body.level}", "${req.body.resorts}", "${req.body.password}"); `
  //   );

  // } catch (err) {
  //   res.status(404).send({ message: "user not valid" });
  // }
});

module.exports = router;
