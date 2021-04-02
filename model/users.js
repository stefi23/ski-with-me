const { db, getValueId, valueExistsInDatabase, insertValueIntoTable, insertValuesIntoIntermediateTable } = require("../model/helper");

const crypto = require("crypto");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const isEqual = require('lodash/isEmpty')

const supersecret = process.env.SUPER_SECRET;

const getIdandName = (email, hashedPassword) => {
    return db(`SELECT id, first_name from users WHERE email = ?  AND password = ?;`,
        [email, hashedPassword])
};

const getId = (email, hashedPassword) => {
    return db(
      `SELECT id from users WHERE email = ? AND password = ?;`,
      [email, hashedPassword])
}

const insertData = (first_name, last_name, email, sport, level, hashedPassword) => {
    return db(
      'INSERT INTO users (first_name, last_name, email, sport, level, password ) VALUES (?, ?, ?, ?, ?, ?);',
      [first_name, last_name, email, sport, level, hashedPassword]
    )
}

const getName = (id) => {
    return db(
      'SELECT first_name from users WHERE id = ?;', [id]
    );
} 

const getUserByEmail = (email) => {
   return db(`SELECT id FROM users WHERE email = ?;`, [email]);
}

const cryptoPassword = (password, email) => {
  return new Promise((resolve, reject) => {
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


const getToken =  (user_id) => {
  const token = jwt.sign(
    {
      user_id: user_id,
    },
    supersecret
  );
  return token;
};

const isUserRegistered = async (email) => {
  result = await getValueId("users", "email", email);

  if (result.data[0] && !result.data[0].id) {
    return true;
  } else {
    return false;
  }
};


const insertIntoDatabase = async (
  user_id,
  table_name,
  table_column,
  value,
  valueId
) => {

  try {
  const result = await valueExistsInDatabase(table_name, table_column, value);
  if (isEqual(result.data[0], {})) {
    await insertValueIntoTable(table_name, table_column, value);
  }

  let result_id = await getValueId(table_name, table_column, value);
  let value_id = result_id.data[0].id;
  
  const results = await insertValuesIntoIntermediateTable(
    `${table_name}_user`,
    "user_id",
    valueId,
    user_id,
    value_id
  );

  }
  catch(error){
    console.log("ERROR: Insert into database: ", error)
  }
};

const insertUserResorts = (user_id, resort) => {
  return insertIntoDatabase(
          user_id,
          "resorts",
          "resort_name",
          resort,
          "resort_id"
        );
}

const insertUserLanguages = (user_id, language) => {
  return insertIntoDatabase(
          user_id,
          "languages",
          "language",
          language,
          "language_id"
        );
}

const getData = async (level, language, sport, resort) => {
  
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
  
   let query = `
    SELECT users.id, first_name, last_name, sport,level,GROUP_CONCAT(DISTINCT resort_name) AS resort, GROUP_CONCAT( DISTINCT language) AS languages, email
    FROM users
    JOIN resorts_user ON resorts_user.user_id = users.id
    JOIN resorts ON resorts.id = resorts_user.resort_id
    JOIN languages_user ON languages_user.user_id = users.id
    JOIN languages lang ON languages_user.language_id = lang.id
    ${whereClause}
    GROUP BY id, first_name, last_name;`;
  return db(query, params)
}


const getUserResorts = (user_id) => {
  return db(`
    SELECT resort_id, resort_name
    FROM resorts_user 
    JOIN resorts ON resorts.id = resorts_user.resort_id
    WHERE user_id = ?;`, [user_id]
  );
}

const getUserLanguages = (user_id) => {
  return db(`
    SELECT language_id, language
    FROM languages_user 
    JOIN languages lang ON languages_user.language_id = lang.id
    WHERE user_id = ?;`, [user_id]
  );
}

 const updateUserData = (first_name, last_name, sport, level, user_id) => {
   return db("UPDATE USERS SET first_name = ?, last_name = ?, sport = ?, level = ? WHERE id = ?",
      [first_name, last_name, sport, level, user_id])
 }

const deleteResortFromUser = (user_id, resort_id) => {
     return db("DELETE FROM resorts_user where user_id = ? and resort_id = ?;", [user_id, resort_id])
    }

const deleteLanguageFromUser = (user_id, language_id) => {
  return db("DELETE FROM languages_user where user_id = ? and language_id = ?;", [user_id, language_id])
}

module.exports = { insertUserResorts, insertUserLanguages, insertIntoDatabase, getIdandName, getId, insertData, getName, 
  getUserByEmail, cryptoPassword, getToken, isUserRegistered, getData, getUserResorts, 
  getUserLanguages, updateUserData, deleteResortFromUser, deleteLanguageFromUser }