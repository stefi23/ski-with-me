// export function getIdandName(email, hashedPassword) {
//     return `SELECT id, first_name from users WHERE email = ?  AND password = ?;`,
//         [email, hashedPassword]
// }

const { db, getValueId } = require("../model/helper");
const crypto = require("crypto");
var jwt = require("jsonwebtoken");
require("dotenv").config();

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

module.exports = { getIdandName, getId, insertData, getName, getUserByEmail, cryptoPassword, getToken, isUserRegistered }; 