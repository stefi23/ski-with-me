const db = require("../model/helper");

const getAllResorts = () => {
    return db(`SELECT resort_name FROM resorts;`);
};

module.exports = { getAllResorts }; 