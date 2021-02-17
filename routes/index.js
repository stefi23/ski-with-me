var express = require("express");
var router = express.Router();
const {db} = require("../model/helper");
const { getAllResorts } = require('../model/resorts')
const { getAllLanguages } = require('../model/languages')

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

//All resorts available in the db 
router.get("/AllResorts", async (req, res) => {
  try {
    const response = await getAllResorts()
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//All languages available in the db 
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

//user model - to be moved
router.get(`/everything`, async (req, res) => {
  // accepts urls like http://localhost/everything?language=english&sport=ski&level=pro

  

  let whereClause = getWhereClause(req);

  try {
    let query = `
    SELECT users.id, first_name, last_name, sport,level,GROUP_CONCAT(DISTINCT resort_name) AS resort, GROUP_CONCAT( DISTINCT language) AS languages, email
    FROM users
    JOIN resorts_user ON resorts_user.user_id = users.id
    JOIN resorts ON resorts.id = resorts_user.resort_id
    JOIN languages_user ON languages_user.user_id = users.id
    JOIN languages lang ON languages_user.language_id = lang.id
    ${whereClause.clause}
    GROUP BY id, first_name, last_name;`;
    const response = await db(query, whereClause.params); // Again, you will probably will get duplicated entries for this query - fixed
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;


// `select users.id, users.first_name, GROUP_CONCAT(DISTINCT resorts.resort_name), GROUP_CONCAT(DISTINCT languages.language)
// from users
// join resorts_user on resorts_user.user_id = users.id
// join resorts on resorts.id = resorts_user.resort_id
// join languages_user on users.id = languages_user.user_id
// join languages on languages.id = languages_user.language_id
// where resorts_user.user_id in (
//   SELECT resorts_user.user_id
// FROM users
// join resorts_user on resorts_user.user_id = users.id
// JOIN resorts ON resorts.id = resorts_user.resort_id
// join languages_user on users.id = languages_user.user_id
// join languages on languages.id = languages_user.language_id
// WHERE resorts.resort_name = "Andorra" and languages.language = "English" 
// )
// AND sport = "ski"
// group by users.id;`



//   `select users.id, users.first_name, GROUP_CONCAT(DISTINCT resorts.resort_name), GROUP_CONCAT(DISTINCT languages.language)
// from users
// join resorts_user on resorts_user.user_id = users.id
// join resorts on resorts.id = resorts_user.resort_id
// join languages_user on users.id = languages_user.user_id
// join languages on languages.id = languages_user.language_id
// where users.id in (SELECT resorts_user.user_id FROM resorts_user JOIN resorts ON resorts.id = resorts_user.resort_id WHERE resorts.resort_name = "Andorra")
//   SELECT resorts_user.user_id
// )
// AND sport = "ski"
// group by users.id;`


//   // STEFI
//   `SELECT users.id, first_name, last_name, sport, level, GROUP_CONCAT(DISTINCT resort_name) AS resort, GROUP_CONCAT(DISTINCT language) AS languages, email
// FROM users
// JOIN resorts_user ON resorts_user.user_id = users.id
// JOIN resorts ON resorts.id = resorts_user.resort_id
// JOIN languages_user ON languages_user.user_id = users.id
// JOIN languages lang ON languages_user.language_id = lang.id
// WHERE users.id IN(
//   SELECT resorts_user.user_id FROM resorts_user 
//      JOIN resorts ON resorts.id = resorts_user.resort_id 
//      WHERE resorts.resort_name = "Andorra")
// AND users.id IN (
//     SELECT languages_user.user_id FROM languages_user
//      JOIN languages lang ON languages_user.language_id = lang.id 
//      WHERE lang.language = "English")
// AND sport = "ski"
// GROUP BY users.id;`