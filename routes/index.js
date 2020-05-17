var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// /* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    let response = await db(`
  SELECT users.id, first_name, last_name, sport,level, language, resort_name
    FROM users
    LEFT JOIN languages_user ON languages_user.user_id = users.id
    LEFT JOIN resorts_user ON resorts_user.user_id = users.id
    LEFT JOIN languages lang ON languages_user.language_id = lang.id
    LEFT JOIN resorts resort ON resorts_user.id = resort.id
    ;`);

    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/resort/:resort", async (req, res) => {
  const resort = req.params.resort;
  try {
    const response = await db(`
  SELECT users.id, first_name, last_name, sport,level, language, resort_name
    FROM users
    LEFT JOIN languages_user ON languages_user.user_id = users.id
    LEFT JOIN resorts_user ON resorts_user.user_id = users.id
    LEFT JOIN languages lang ON languages_user.language_id = lang.id
    LEFT JOIN resorts resort ON resorts_user.id = resort.id
    WHERE resort_name = "${resort}"
    ;`);
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/level/:level", async (req, res) => {
  const level = req.params.level;
  try {
    const response = await db(`
  SELECT users.id, first_name, last_name, sport,level, language, resort_name
    FROM users
    LEFT JOIN languages_user ON languages_user.user_id = users.id
    LEFT JOIN resorts_user ON resorts_user.user_id = users.id
    LEFT JOIN languages lang ON languages_user.language_id = lang.id
    LEFT JOIN resorts resort ON resorts_user.id = resort.id
    WHERE level = "${level}"
    ;`);
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/sport/:sport", async (req, res) => {
  const sport = req.params.sport;
  try {
    const response = await db(`
  SELECT users.id, first_name, last_name, sport,level, language, resort_name
    FROM users
    LEFT JOIN languages_user ON languages_user.user_id = users.id
    LEFT JOIN resorts_user ON resorts_user.user_id = users.id
    LEFT JOIN languages lang ON languages_user.language_id = lang.id
    LEFT JOIN resorts resort ON resorts_user.id = resort.id
    WHERE sport = "${sport}"
    ;`);
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

//
