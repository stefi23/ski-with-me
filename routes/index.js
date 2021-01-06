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
// router.get("/AllResorts/:resort", async (req, res) => {
//   const resort = req.params.resort;
//   try {
//     const response = await db(`
//   SELECT resort_name FROM resorts WHERE resort_name LIKE "%${resort}%";`);
//     res.status(200).send(response.data);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

//Serch resorts based on user input 
router.get("/AllResorts/:resort", async (req, res) => {
  const resort = req.params.resort;
  try {
    const response = await db('SELECT resort_name FROM resorts WHERE resort_name LIKE ?;', [`%${resort}%`]);
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Serch language based on user input 
router.get("/AllLanguages/:language", async (req, res) => {
  const language = req.params.language;
  try {
    const response = await db('SELECT language FROM languages WHERE language LIKE ?;', [`%${language}%`]);
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
    WHERE resort_name = ?
    ;`, [`${resort}`]);
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
    WHERE level = ?
    GROUP BY id, first_name, last_name
    ;`, [`${level}`]);
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
    WHERE sport = ?
    GROUP BY id, first_name, last_name;
`, [`${sport}`]);
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});


//TO BE CHECKED!
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

  // http://localhost:5000/everything?sport=ski" GROUP BY first_name, last_name; update users set first_name = "Hacked" where id = 1; select id, first_name, last_name, count(*) from users where sport = "ski
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
    conditions.push("lang.language = ?");
    params.push(language);
  }

  if (resort) {
    conditions.push("resort_name = ?")
    params.push(resort);
  }

  let whereClause = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";

  try {
    let query = `
    SELECT users.id, first_name, last_name, sport,level,GROUP_CONCAT(DISTINCT resort_name) AS resort, GROUP_CONCAT( DISTINCT language) AS languages, email
    FROM users
    LEFT JOIN resorts_user ON resorts_user.user_id = users.id
    LEFT JOIN resorts ON resorts.id = resorts_user.resort_id
    LEFT JOIN languages_user ON languages_user.user_id = users.id
    LEFT JOIN languages lang ON languages_user.language_id = lang.id
    ${whereClause}
    GROUP BY id, first_name, last_name;`;
    console.log(query);
    const response = await db(query, params); // Again, you will probably will get duplicated entries for this query - fixed
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
