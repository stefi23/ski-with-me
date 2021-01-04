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

//All resorts available in the db 
router.get("/AllResorts", async (req, res) => {
  try {
    const response = await db(`
  SELECT resort_name FROM resorts;`);
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//All languages available in the db 
router.get("/AllLanguages", async (req, res) => {
  try {
    const response = await db(`
  SELECT language FROM languages;`);
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Serch resorts based on user input 
router.get("/AllResorts/:resort", async (req, res) => {
  const resort = req.params.resort;
  try {
    const response = await db(`
  SELECT resort_name FROM resorts WHERE resort_name LIKE "%${resort}%";`);
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Serch language based on user input 
router.get("/AllLanguages/:language", async (req, res) => {
  const language = req.params.language;
  try {
    const response = await db(`
   SELECT language FROM languages WHERE language LIKE "%${language}%";`);
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//All users from a specific resort
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

//All users with a specific level
router.get("/level/:level", async (req, res) => {
  const level = req.params.level;
  try {
    const response = await db(`
  SELECT users.id, first_name, last_name, sport,level,GROUP_CONCAT(DISTINCT resort_name) AS resorts, GROUP_CONCAT( DISTINCT language) AS languages, email
    FROM users
    LEFT JOIN languages_user ON languages_user.user_id = users.id
    LEFT JOIN resorts_user ON resorts_user.user_id = users.id
    LEFT JOIN languages lang ON languages_user.language_id = lang.id
    LEFT JOIN resorts resort ON resorts_user.id = resort.id
    WHERE level = "${level}"
    GROUP BY id, first_name, last_name
    ;`);
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//All users doing a specific sport
router.get("/sport/:sport", async (req, res) => {
  const sport = req.params.sport;
  try {
    const response = await db(`
  SELECT users.id, first_name, last_name, sport,level,GROUP_CONCAT(DISTINCT resort_name) AS resorts, GROUP_CONCAT( DISTINCT language) AS languages, email
    FROM users
    LEFT JOIN languages_user ON languages_user.user_id = users.id
    LEFT JOIN resorts_user ON resorts_user.user_id = users.id
    LEFT JOIN languages lang ON languages_user.language_id = lang.id 
    LEFT JOIN resorts resort ON resorts_user.id = resort.id
    WHERE sport = "${sport}"
    GROUP BY id, first_name, last_name;
`);
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/resorts", async (req, res) => {
  // accepts urls like http://localhost/resorts?resort=Molina&language=English&sport=ski
  const { resort, language, sport } = req.query;
  console.log(resort)
  if (!resort) {
    res.status(404).send("Not found");
    return;
  }
  try {
    const response = await db(`
  SELECT resort_name
    FROM resorts
    LEFT JOIN resorts_user ON resorts_user.resort_id = resorts.id
    LEFT JOIN users ON users.id = resorts_user.user_id
    LEFT JOIN languages_user ON languages_user.user_id = users.id
    LEFT JOIN languages lang ON languages_user.language_id = lang.id
    WHERE resort_name = "${resort}"
    ${language ? ` AND languages.language = "${language}"` : ""}
    ${sport ? ` AND users.sport = "${sport}"` : ""}
    ;`); // Be careful here, as you will probably get lots of duplicated resorts
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get(`/everything`, async (req, res) => {
  // accepts urls like http://localhost/everything?language=english&sport=ski&level=pro
  const { level, language, sport, resort } = req.query;
  if (!level && !language && !sport && !resort) {
    const response = await db(`
  SELECT users.id, first_name, last_name, sport,level,GROUP_CONCAT(DISTINCT resort_name) AS resort, GROUP_CONCAT( DISTINCT language) AS languages, email
    FROM users
    LEFT JOIN languages_user ON languages_user.user_id = users.id
    LEFT JOIN resorts_user ON resorts_user.user_id = users.id
    LEFT JOIN languages lang ON languages_user.language_id = lang.id 
    LEFT JOIN resorts res ON resorts_user.resort_id = res.id
    GROUP BY id, first_name, last_name;`);
    res.status(200).send(response.data);
    return;
  }
  try {
    let whereClause = level ? ` WHERE users.level = "${level}"` : "";
    if (sport) {
      whereClause = whereClause
        ? `${whereClause} AND users.sport = "${sport}"`
        : ` WHERE users.sport = "${sport}"`;
    }
    if (language) {
      whereClause = whereClause
        ? `${whereClause} AND lang.language = "${language}"`
        : ` WHERE lang.language = "${language}"`;
    }
    if (resort) {
      whereClause = whereClause
        ? `${whereClause} AND resort_name = "${resort}"`
        : ` WHERE resort_name = "${resort}"`;
    }

    const response = await db(`
    SELECT users.id, first_name, last_name, sport,level,GROUP_CONCAT(DISTINCT resort_name) AS resort, GROUP_CONCAT( DISTINCT language) AS languages, email
    FROM users
    LEFT JOIN resorts_user ON resorts_user.user_id = users.id
    LEFT JOIN resorts ON resorts.id = resorts_user.resort_id
    LEFT JOIN languages_user ON languages_user.user_id = users.id
    LEFT JOIN languages lang ON languages_user.language_id = lang.id
    ${whereClause}
    GROUP BY id, first_name, last_name;`); // Again, you will probably will get duplicated entries for this query - fixed
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
