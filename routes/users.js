var express = require("express");
var router = express.Router();
const { db } = require("../model/helper");
var jwt = require("jsonwebtoken");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
require("dotenv").config();
const capitalize = require('lodash/capitalize')
const {insertUserResorts, insertIntoDatabase, insertUserLanguages, getIdandName, getId, insertData, getName, 
  getUserByEmail, cryptoPassword, getToken, isUserRegistered, getUserResorts, 
  getUserLanguages, updateUserData, deleteResortFromUser, deleteLanguageFromUser 
} = require('../model/users')


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
    const user_id = userData.data[0].id;

    const { data } = await getName(user_id);

    const name = data[0].first_name;

    if (userData.data[0] && userData.data[0].id) {
      token = await getToken(userData.data[0].id);
    }
   
    resorts.forEach(async (resort) => {
      resort = capitalize(resort)
      try {
        await insertUserResorts(user_id, resort)
      } catch (err) {
        res.status(500).send(err);
      }
    });

    languages.forEach(async (language) => {
      language = capitalize(language);
      try {
        await insertUserLanguages(user_id, language)
      } catch (err) {
        res.status(500).send(err);
      }
    });

    if (user.data && user.data.length) {
      res.status(200).send({
        message: "user was added",
        token,
        name,
        user_id
      });
    }
  } catch (err) {
    console.log("Error: (User not valid): ", err)
    res.status(404).send({ message: "user not valid" });
  }
});

//IN PROGRESS: TODO -> move to model  insertIntoDatabase as insertUserLanguages and insertUserResorts

router.post("/editProfile", userShouldBeLoggedIn, async(req, res, next) => {
  try{
    let {
        first_name,
        last_name,
        sport,
        level,
        resorts,
        languages,
      } = req.body;

    let user_id = req.user_id;

    await updateUserData(first_name, last_name, sport, level, user_id)

    let old_resorts = await getUserResorts(user_id);
    let removed_resorts =  old_resorts.data.filter(resort => !resorts.includes(resort.resort_name));

    for (const resort of removed_resorts) {
      await deleteResortFromUser(user_id, resort.resort_id)
    }

    let old_resort_names = old_resorts.data.map(resort => resort.resort_name)
    let added_resorts = resorts.filter(newResort => !old_resort_names.includes(newResort))
    added_resorts.forEach(async (resort) => {
      resort = capitalize(resort)
      try {
        await insertUserResorts(user_id, resort)
      } catch (err) {
        res.status(500).send(err);
      }
    });

    let old_languages = await getUserLanguages(user_id)
    let removed_languages =  old_languages.data.filter(language => !languages.includes(language.language));
    
    for (const language of removed_languages) {
      await deleteLanguageFromUser(user_id, language.language_id)
    }


    let old_languages_names = old_languages.data.map(language => language.language)
    let added_languages = languages.filter(newLanguage => !old_languages_names.includes(newLanguage))

    added_languages.forEach(async (language) => {
      language = capitalize(language)
      try {
        await insertUserLanguages(user_id, language)
      } catch (err) {
        res.status(500).send(err);
      }
    });


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






module.exports = router;
