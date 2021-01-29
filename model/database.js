require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "skiBuddies",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");


  //ALTER TABLE users ADD CONSTRAINT CHECK sport in ('ski', 'snowboard', 'both');
  let sql =
    "DROP TABLE if exists user; CREATE TABLE users(id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(40) NOT NULL, last_name VARCHAR(40)  NOT NULL, sport VARCHAR(40) NOT NULL, level varchar(255) NOT NULL, password TEXT NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY (id));";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `users` was successful!");

    console.log("Closing...");
  });

  sql =
    "DROP TABLE if exists languages; CREATE TABLE languages(id INT NOT NULL AUTO_INCREMENT, language VARCHAR(255) NOT NULL, PRIMARY KEY (id));";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `languages` was successful!");

    console.log("Closing...");
  });

  sql =
    "DROP TABLE if exists resorts; CREATE TABLE resorts(id INT NOT NULL AUTO_INCREMENT, resort_name varchar(255), PRIMARY KEY (id));";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `resorts` was successful!");

    console.log("Closing...");
  });

  sql =
    "DROP TABLE if exists resorts_user; CREATE TABLE resorts_user(id INT NOT NULL AUTO_INCREMENT, user_id INT NOT NULL, resort_id INT NOT NULL, PRIMARY KEY (id));";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `resorts_user` was successful!");

    console.log("Closing...");
  });

  sql =
    "DROP TABLE if exists favorite_users; CREATE TABLE favorite_users(id INT NOT NULL AUTO_INCREMENT, user_id int(255) NOT NULL, user_id_favorite int(255) NOT NULL, PRIMARY KEY (id));";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `favorite_users` was successful!");

    console.log("Closing...");
  });

  sql =
    "DROP TABLE if exists languages_user; CREATE TABLE languages_user(id INT NOT NULL AUTO_INCREMENT, language_id int(255) not null, user_id int(255) not null, PRIMARY KEY (id));";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `languages_user` was successful!");

    console.log("Closing...");
  });

  sql =
    "DROP TABLE if exists level; CREATE TABLE level(id INT NOT NULL AUTO_INCREMENT, level_name varchar(255), PRIMARY KEY (id));";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `level` was successful!");

    console.log("Closing...");
  });

  sql =
    "DROP TABLE if exists sport; CREATE TABLE sport(id INT NOT NULL AUTO_INCREMENT, sport_name varchar(255), PRIMARY KEY (id));";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `sport` was successful!");

    console.log("Closing...");
  });

  sql =
    "DROP TABLE if exists level_user; CREATE TABLE level_user(id INT NOT NULL AUTO_INCREMENT, user_id INT NOT NULL, level_id INT NOT NULL, PRIMARY KEY (id));";




  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `level_users` was successful!");

    console.log("Closing...");
  });

  sql =
    "DROP TABLE if exists sport_users; CREATE TABLE sport_user(id INT NOT NULL AUTO_INCREMENT, user_id INT NOT NULL, sport_id INT NOT NULL, PRIMARY KEY (id));";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `sport_users` was successful!");

    console.log("Closing...");
  });

  con.end();
});
