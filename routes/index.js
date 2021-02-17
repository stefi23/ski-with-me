var express = require("express");
var router = express.Router();
const { getAllResorts } = require('../model/resorts')
const { getAllLanguages } = require('../model/languages')
const { getData } = require('../model/users')
 
router.get("/", async (req, res, next) => {
  try {
    let response = await getData()
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/AllResorts", async (req, res) => {
  try {
    const response = await getAllResorts()
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/AllLanguages", async (req, res) => {
  try {
    const response = await getAllLanguages()
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get(`/everything`, async (req, res) => {
  // accepts urls like http://localhost/everything?language=english&sport=ski&level=pro
const { level, language, sport, resort } = req.query;

  try {
    const response = await getData(level, language, sport, resort)
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

