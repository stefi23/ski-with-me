require("dotenv").config();
const mysql = require("mysql");

// module.exports = async function db(query, query_params = []) {
const db = async (query, query_params = []) => {  
const results = {
    data: [],
    error: null,
  };
  let promise = await new Promise((resolve, reject) => {
    const DB_HOST = process.env.DB_HOST;
    const DB_USER = process.env.DB_USER;
    const DB_PASS = process.env.DB_PASS;
    const DB_NAME = process.env.DB_NAME;

    const con = mysql.createConnection({
      host: DB_HOST || "127.0.0.1",
      user: DB_USER || "root",
      password: DB_PASS,
      database: DB_NAME || "database",
      multipleStatements: true,
    });

    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");

      con.query(query, query_params, function (err, result) {
        if (err) {
          results.error = err;
          console.log(err);
          resolve(results);
          con.end();
          return;
        }

        if (!result.length) {
          if (result.affectedRows === 0) {
            results.error = "Action not complete";
            console.log(err);
            resolve(results);
            con.end();
            return;
          }

          // push the result (which should be an OkPacket) to data
          results.data.push(result);
        } else if (result[0].constructor.name == "RowDataPacket") {
          // push each row (RowDataPacket) to data
          result.forEach((row) => results.data.push(row));
        } else if (result[0].constructor.name == "OkPacket") {
          // push the first item in result list to data (this accounts for situations
          // such as when the query ends with SELECT LAST_INSERT_ID() and returns an insertId)
          results.data.push(result[0]);
        }

        con.end();
        resolve(results);
      });
    });
  });

  return promise;
};

const getValueId = async (table_name, table_column, value) => {
  return await db(
    `SELECT id FROM ${table_name} WHERE ${table_column} = ?;`, [value]
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
    `INSERT INTO ${table_name} (${column_name1}, ${column_name2}) VALUES (?, ?);`, [value1, value2]
  );
};
const insertValueIntoTable = async (table_name, table_column, value) => {
  console.log("works")
  return await db(
    `INSERT INTO ${table_name} (${table_column}) VALUES (?)`, [value]
  );
};

module.exports = { db, getValueId, insertValuesIntoIntermediateTable, insertValueIntoTable }