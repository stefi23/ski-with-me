var express = require("express");
var router = express.Router();
const db = require("../model/helper");
var jwt = require("jsonwebtoken");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
require("dotenv").config();
const crypto = require("crypto");

const supersecret = process.env.SUPER_SECRET;

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await cryptoPassword(password, email);

  try {
    let result = await db(
      `SELECT id, first_name from users WHERE email = ?  AND password = "${hashedPassword}";`,
      [email]
    );
    const name = result.data[0].first_name;

    if (result.data[0] && result.data[0].id) {
      //   create new token
      const token = jwt.sign(
        {
          user_id: result.data[0].id,
        },
        supersecret
      );
      res.status(200).send({
        messsage: "Login successful",
        name,
        token,
      });
    } else {
      res
        .status(400)
        .send({ message: "Login not successful", error: "user not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/profileInfo", userShouldBeLoggedIn, function(req, res, next) {
  res.send({
    message: "Yes the user is logged in " + req.user_id,
  });
});

router.get("/profile", (req, res, next) => {
  const token = req.headers[`x-access-token`];
  if (!token) {
    res.status(401).send({ message: "Please provide a token" });
  } else {
    jwt.verify(token, supersecret, async function(err, decoded) {
      if (err) {
        res.status(401).send({ message: err.message });
      } else {
        const { data } = await db(
          `SELECT first_name from users WHERE id = ${decoded.user_id}`
        );
        const name = data[0].first_name;

        res.send({
          message: "here is your protected data for user " + decoded.user_id,
          name,
        });
      }
    });
  }
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

    if (!isUserRegistered(email)) {
      res.status(200).send({ message: "user is already registered" });
    }

    const hashedPassword = await cryptoPassword(password, email);

    let user = await db(
      `INSERT INTO users (first_name, last_name, email, sport, level, password ) VALUES ("${first_name}", "${last_name}", "${email}", "${sport}", "${level}", "${hashedPassword}");`
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
  table_column,
  value,
  valueId
) => {
  result = await valueExistsInDatabase(table_name, table_column, value);
  if (result.data[0] && !result.data[0].length) {
    await insertValueIntoTable(table_name, table_column, value);
  }

  let user_id = await getUserId(email);

  let token = jwt.sign({ user_id: user_id }, supersecret);

  let result_id = await getValueId(table_name, table_column, value);
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

const isUserRegistered = async (email) => {
  result = await getValueId("users", "email", email);
  if (result.data[0] && !result.data[0].length) {
    return true;
  } else {
    return false;
  }
};

const cryptoPassword = (password, email) => {
  return new Promise((resolve, reject) => {
    console.log("email", email);
    crypto.pbkdf2(password, email, 100000, 64, "sha512", (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        let hashPassword = derivedKey.toString("hex");
        resolve(hashPassword);
      }
    });
  });
};

module.exports = router;
