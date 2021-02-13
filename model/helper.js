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
  console.log("insertValuesIntoIntermediateTable")
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

const valueExistsInDatabase = async (table_name, column_name, value) => {
  console.log("valueExistsInDatabase")
  return await db(
    `SELECT id FROM ${table_name} WHERE ${column_name} = ?;`, [value]
  );
};

const insertIntoDatabase = async (
  email,
  table_name,
  table_column,
  value,
  valueId
) => {
  const result = await valueExistsInDatabase(table_name, table_column, value);
  console.log("RESULT", result)
  if (isEqual(result.data[0], {})) {
     console.log("RESULT IN IF", result)
    await insertValueIntoTable(table_name, table_column, value);
  }

  console.log("LINE BELOW")
  let user_id = await getUserByEmail(email);
  // let user_id = await getUserId(email);
  console.log(user_id)
  let token = jwt.sign({ user_id: user_id }, supersecret);

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
};

module.exports = { db, getValueId, insertValuesIntoIntermediateTable, insertValueIntoTable, valueExistsInDatabase, insertIntoDatabase }