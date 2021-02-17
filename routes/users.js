var express = require("express");
var router = express.Router();
const { db } = require("../model/helper");
var jwt = require("jsonwebtoken");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
require("dotenv").config();
const capitalize = require('lodash/capitalize')
const {insertIntoDatabase, getIdandName, getId, insertData, getName, getUserByEmail, cryptoPassword, getToken, isUserRegistered} = require('../model/users')


/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await cryptoPassword(password, email);

  try {
    let result = await getIdandName(email, hashedPassword)
    const name = result.data[0].first_name;
    const id = result.data[0].id;

    if (result.data[0] && result.data[0].id) {
      const token = await getToken(result.data[0].id);

      res.status(200).send({
        messsage: "Login successful",
        name,
        token,
        id
      });
    } else {
      res
        .status(400)
        .send({ message: "Login not successful", error: "email or password incorrect" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/profile", userShouldBeLoggedIn, async function (req, res, next) {
  const id = req.user_id;
  const { data } = await getName(id);
  const name = data[0].first_name;

  res.send({
    message: "Yes the user is logged in " + id,
    name,
    id
  });
});

router.post("/register", async (req, res, next) => {
  try {
    let {
      first_name,
      last_name,
      email,
      sport,
      level,
      password,
      resorts,
      languages,
    } = req.body;
    let token;
    try {
      const result = await isUserRegistered(email);
      if (!result) {
        return res.status(200).send(
          {
            message: "user is already registered"
          }
        );
      }
    } catch (err) {
      res.status(500).send(err);
    }

    const hashedPassword = await cryptoPassword(password, email);

    let user = await insertData(first_name, last_name, email, sport, level, hashedPassword);
    let userData = await getId(email, hashedPassword);
    const id = userData.data[0].id;

    const { data } = await getName(id);

    const name = data[0].first_name;

    if (userData.data[0] && userData.data[0].id) {
      token = await getToken(userData.data[0].id);
    }
   
    resorts.forEach(async (resort) => {
      resort = capitalize(resort)
      try {
        await insertIntoDatabase(
          email,
          "resorts",
          "resort_name",
          resort,
          "resort_id"
        );
      } catch (err) {
        res.status(500).send(err);
      }
    });

    languages.forEach(async (language) => {
      language = capitalize(language);
      try {
        await insertIntoDatabase(
          email,
          "languages",
          "language",
          language,
          "language_id"
        );
      } catch (err) {
        res.status(500).send(err);
      }
    });

    if (user.data && user.data.length) {
      res.status(200).send({
        message: "user was added",
        token,
        name,
        id
      });
    }
  } catch (err) {
    res.status(404).send({ message: "user not valid" });
  }
});

//IN PROGRESS: Building Edit profile query: 

router.post("/editProfile", userShouldBeLoggedIn, async(req, res, next) => {
try{
  //get the data from the user
   let {
      first_name,
      last_name,
      sport,
      level,
      resorts,
      languages,
    } = req.body;
  //   const userId = result.data[0].id
  //   console.log("userID", userId)
 // userID { data: [ RowDataPacket { id: 16 } ], error: null }
    //sport and level have to be from the specified options
    // Deal with unspecified fields.
    // Check that the user is only editting themself.


    // ALTER TABLE users ADD CONSTRAINT CHECK sport in ('ski', 'snowboard', 'both');
    // 
    const userData = await db("UPDATE USERS SET first_name = ?, last_name = ?, sport = ?, level = ? WHERE id = ?",
      [first_name, last_name, sport, level, req.user_id]
)
return res.status(200).send(
          {
            message: "user data is updated"
          }
        );
}
catch(err){
  console.log(err)
}

})

//End of query





module.exports = router;
