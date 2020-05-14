var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res, next) => {
  console.log(req.body.resorts);
  try {
    let {
      first_name,
      last_name,
      email,
      sport,
      level,
      password,
      resorts,
    } = req.body;
    let user = await db(
      `INSERT INTO users (first_name, last_name, email, sport, level, password ) VALUES ("${first_name}", "${last_name}", "${email}", "${sport}", "${level}", "${password}");`
    );
    resorts.forEach(async (resort) => {
      try {
        result = await db(
          `SELECT id FROM resorts WHERE resort_name=${resort} `
        );
        if (!result.data.length) {
          let results_resort = await db(
            `INSERT INTO resorts (resort_name) VALUES ("${resort}")`
          );
        }

        let user_id = await db(`SELECT id FROM users WHERE email = "${email}"`);
        let resorts_id = await db(
          `SELECT id FROM resorts WHERE resort_name="${resort}"`
        );
        user_id = user_id.data[0].id;
        let resort_id = resorts_id.data[0].id;

        results = await db(
          `INSERT INTO resorts_user (user_id, resorts_id) VALUES (${user_id}, ${resort_id});`
        );
      } catch (err) {
        res.status(500).send(err);
      }
    });
    if (user.data && user.data.length) {
      res.status(200).send({ message: "user was added" });
    }
  } catch (err) {
    res.status(404).send({ message: "user not valid" });
  }
});

module.exports = router;
