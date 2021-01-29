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

// const anotherSQL..


module.exports = { getIdandName}; 