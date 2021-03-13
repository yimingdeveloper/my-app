var express = require("express");
var router = express.Router();
const myDB = require("../database/db.js");

// GET home page
router.get("/", function (req, res) {
  res.render("index");
});

// Data endpoint for shades
router.get("/getShade", async (req, res) => {
  console.log(req, res);
  try {
    console.log("my database ", myDB);
  } catch (e) {
    console.log("Error", e);
  }
});

router.post("createShade", async (req, res) => {
  console.log(req, res);
  console.log("Create shade ", req.body);
});

module.exports = router;
