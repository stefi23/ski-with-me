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
  email,
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

  let user_id = await getUserByEmail(email);

  let result_id = await getValueId(table_name, table_column, value);
  user_id = user_id.data[0].id;
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
    console.log(error)
  }
};




module.exports = { insertIntoDatabase, getIdandName, getId, insertData, getName, getUserByEmail, cryptoPassword, getToken, isUserRegistered }