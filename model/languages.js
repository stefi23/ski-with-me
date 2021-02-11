const {db} = require("../model/helper");

const getAllLanguages = () => {
    return db(`SELECT language FROM languages;`);
}

module.exports = { getAllLanguages }; 