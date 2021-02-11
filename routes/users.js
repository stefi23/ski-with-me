var express = require("express");
var router = express.Router();
const { db, getValueId, insertValuesIntoIntermediateTable, insertValueIntoTable } = require("../model/helper");
var jwt = require("jsonwebtoken");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
require("dotenv").config();
const crypto = require("crypto");
const isEqual = require('lodash/isEmpty')
const capitalize = require('lodash/capitalize')

const {getIdandName, getId, insertData, getName, getUserByEmail, cryptoPassword, getToken, isUserRegistered} = require('../model/users')

const supersecret = process.env.SUPER_SECRET;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await cryptoPassword(password, email);

  try {
    let result = await getIdandName(email, hashedPassword)
    // db(
    //   `SELECT id, first_name from users WHERE email = ?  AND password = ?;`,
    //   [email, hashedPassword]
    // );
    const name = result.data[0].first_name;
    const id = result.data[0].id;

    if (result.data[0] && result.data[0].id) {
      const token = await getToken(result.data[0].id);

      res.status(200).send({
        messsage: "Login successful",
        name,
        token,
        id
      });
    } else {
      res
        .status(400)
        .send({ message: "Login not successful", error: "email or password incorrect" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/profile", userShouldBeLoggedIn, async function (req, res, next) {
  const id = req.user_id
  const { data } = await getName(id)
  // db(
  //   'SELECT first_name from users WHERE id = ?;', [req.user_id]
  // );
  const name = data[0].first_name;
  res.send({
    message: "Yes the user is logged in " + id,
    name,
    id
  });
});

//IN PROGRESS: Building Edit profile query: 

router.post("/editProfile", userShouldBeLoggedIn, async(req, res, next) => {
try{
  //get the data from the user
  console.log(req.body)
   let {
      first_name,
      last_name,
      sport,
      level,
      resorts,
      languages,
    } = req.body;
  //   const userId = result.data[0].id
  //   console.log("userID", userId)
 // userID { data: [ RowDataPacket { id: 16 } ], error: null }
    //sport and level have to be from the specified options
    // Deal with unspecified fields.
    // Check that the user is only editting themself.


    // ALTER TABLE users ADD CONSTRAINT CHECK sport in ('ski', 'snowboard', 'both');
    // 
    const userData = await db("UPDATE USERS SET first_name = ?, last_name = ?, sport = ?, level = ? WHERE id = ?",
      [first_name, last_name, sport, level, req.user_id]
)
return res.status(200).send(
          {
            message: "user data is updated"
          }
        );
}
catch(err){
  console.log(err)
}

})

//End of query


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
    let token;
    try {
      const result = await isUserRegistered(email);
      if (!result) {
        return res.status(200).send(
          {
            message: "user is already registered"
          }
        );
      }
    } catch (err) {
      res.status(500).send(err);
    }

    const hashedPassword = await cryptoPassword(password, email);

    let user = await insertData(first_name, last_name, email, sport, level, hashedPassword)
    // db(
    //   'INSERT INTO users (first_name, last_name, email, sport, level, password ) VALUES (?, ?, ?, ?, ?, ?);',
    //   [first_name, last_name, email, sport, level, hashedPassword]
    // );

    let userData = await getId(email, hashedPassword)
    // db(
    //   `SELECT id from users WHERE email = ? AND password = ?;`,
    //   [email, hashedPassword]
    // );

    const id = userData.data[0].id

    //Thos data
    const { data } = await getName(id)
    // db(
    //   'SELECT first_name from users WHERE id = ?;', [id]
    // );
    const name = data[0].first_name;

    if (userData.data[0] && userData.data[0].id) {
      token = await getToken(userData.data[0].id);
    }
    console.log(token);

    resorts.forEach(async (resort) => {
      resort = capitalize(resort)
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
      language = capitalize(language);
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
      res.status(200).send({
        message: "user was added",
        token,
        name,
        id
      });
    }
  } catch (err) {
    res.status(404).send({ message: "user not valid" });
  }
});

const valueExistsInDatabase = async (table_name, column_name, value) => {
  return await db(
    `SELECT id FROM ${table_name} WHERE ${column_name} = ?;`, [value]
  );
};

/* Moved to helpers
const insertValueIntoTable = async (table_name, table_column, value) => {
  return await db(
    `INSERT INTO ${table_name} (${table_column}) VALUES (?)`, [value]
  );
};
*/

/*//MOVED! TO MOVE TO MODELS -> HOW TO NAME IT VS getID?
//getUserByEmail(fields)
const getUserId = async (email) => {
  return await db(`SELECT id FROM users WHERE email = ?;`, [email]);
};
*/


/*MOVED to helpers
const getValueId2 = async (table_name, table_column, value) => {
  return await db(
    `SELECT id FROM ${table_name} WHERE ${table_column} = ?;`, [value]
  );
};



const insertValuesIntoIntermediateTable2 = async (
  table_name,
  column_name1,
  column_name2,
  value1,
  value2
) => {
  return await db(
    `INSERT INTO ${table_name} (${column_name1}, ${column_name2}) VALUES (?, ?);`, [value1, value2]
  );
};
*/
const insertIntoDatabase = async (
  email,
  table_name,
  table_column,
  value,
  valueId
) => {
  result = await valueExistsInDatabase(table_name, table_column, value);
  // console.log("result data:", result.data[0])
  // result.data[0] && 

  // console.log("Here:", isEqual(result.data[0], {}))
  if (isEqual(result.data[0], {})) {
    await insertValueIntoTable(table_name, table_column, value);
  }

  
  let user_id = await getUserByEmail(email);
  // let user_id = await getUserId(email);

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
/*MOVED to helpers
const isUserRegistered = async (email) => {
  result = await getValueId("users", "email", email);

  if (result.data[0] && !result.data[0].id) {
    return true;
  } else {
    return false;
  }
};


// const getToken = async (user_id) => {
//   const token = jwt.sign(
//     {
//       user_id: user_id,
//     },
//     supersecret
//   );
//   return token;
// };

// const cryptoPassword = (password, email) => {
//   return new Promise((resolve, reject) => {
//     crypto.pbkdf2(password, email, 100000, 64, "sha512", (err, derivedKey) => {
//       if (err) {
//         reject(err);
//       } else {
//         let hashPassword = derivedKey.toString("hex");
//         resolve(hashPassword);
//       }
//     });
//   });
// };
*/
module.exports = router;
