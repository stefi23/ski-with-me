var express = require("express");
var router = express.Router();
const {db} = require("../model/helper");
const { getAllResorts } = require('../model/resorts')
const { getAllLanguages } = require('../model/languages')
const { getData } = require('../model/users')
 
router.get("/", async (req, res, next) => {
  try {
    let response = await getData()
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/AllResorts", async (req, res) => {
  try {
    const response = await getAllResorts()
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/AllLanguages", async (req, res) => {
  try {
    const response = await getAllLanguages()
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});


function getWhereClause(req) {
  const { level, language, sport, resort } = req.query;
  let conditions = [];
  let params = [];

  if (level) {
    conditions.push("users.level = ?")
    params.push(level);
  }

  if (sport) {
    conditions.push("users.sport = ?")
    params.push(sport);

  }

  if (language) {
    conditions.push(`users.id IN (
      SELECT languages_user.user_id FROM languages_user
        JOIN languages lang ON languages_user.language_id = lang.id 
        WHERE lang.language = ?)`)
    params.push(language);
  }

  if (resort) {
    conditions.push(`users.id IN(
      SELECT resorts_user.user_id FROM resorts_user 
         JOIN resorts ON resorts.id = resorts_user.resort_id 
         WHERE resorts.resort_name = ?)`)
    params.push(resort);
  }

  let whereClause = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";

  return { clause: whereClause, params: params };
}

router.get(`/everything`, async (req, res) => {
  // accepts urls like http://localhost/everything?language=english&sport=ski&level=pro
const { level, language, sport, resort } = req.query;

  try {
    const response = await getData(level, language, sport, resort)
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

