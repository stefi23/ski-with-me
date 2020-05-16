var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res, next) => {
  try {
    let {
      first_name,
      last_name,
      email,
      sport,
      level,
      password,
      resorts,
      languages,
    } = req.body;
    let user = await db(
      `INSERT INTO users (first_name, last_name, email, sport, level, password ) VALUES ("${first_name}", "${last_name}", "${email}", "${sport}", "${level}", "${password}");`
    );
    resorts.forEach(async (resort) => {
      try {
        await insertIntoDatabase(
          email,
          "resorts",
          "resort_name",
          resort,
          "resort_id"
        );
      } catch (err) {
        res.status(500).send(err);
      }
    });

    languages.forEach(async (language) => {
      try {
        await insertIntoDatabase(
          email,
          "languages",
          "language",
          language,
          "language_id"
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

const valueExistsInDatabase = async (table_name, column_name, value) => {
  return await db(
    `SELECT id FROM ${table_name} WHERE ${column_name} = "${value}";`
  );
};

const insertValueIntoTable = async (table_name, table_column, value) => {
  return await db(
    `INSERT INTO ${table_name} (${table_column}) VALUES ("${value}")`
  );
};

const getUserId = async (email) => {
  return await db(`SELECT id FROM users WHERE email = "${email}"`);
};

const getValueId = async (table_name, table_column, value) => {
  return await db(
    `SELECT id FROM ${table_name} WHERE ${table_column} = "${value}"`
  );
};

const insertValuesIntoIntermediateTable = async (
  table_name,
  column_name1,
  column_name2,
  value1,
  value2
) => {
  return await db(
    `INSERT INTO ${table_name} (${column_name1}, ${column_name2}) VALUES (${value1}, ${value2});`
  );
};

const insertIntoDatabase = async (
  email,
  table_name,
  table_colum,
  value,
  valueId
) => {
  result = await valueExistsInDatabase(table_name, table_colum, value);
  if (result.data[0] && !result.data[0].length) {
    await insertValueIntoTable(table_name, table_colum, value);
  }

  let user_id = await getUserId(email);
  let result_id = await getValueId(table_name, table_colum, value);
  user_id = user_id.data[0].id;
  let value_id = result_id.data[0].id;

  results = await insertValuesIntoIntermediateTable(
    `${table_name}_user`,
    "user_id",
    valueId,
    user_id,
    value_id
  );
};

module.exports = router;
