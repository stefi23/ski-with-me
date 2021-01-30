// export function getIdandName(email, hashedPassword) {
//     return `SELECT id, first_name from users WHERE email = ?  AND password = ?;`,
//         [email, hashedPassword]
// }

const db = require("../model/helper");

// const getIdandName = (email, hashedPassword) => {
//     return db(`SELECT id, first_name from users WHERE email = ?  AND password = ?;`,
//         [email, hashedPassword])
// };

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

// 

// const anotherSQL..


module.exports = { getIdandName, getId, insertData, getName }; 