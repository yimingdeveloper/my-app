const express = require("express");
const router = express.Router();
const myDB = require("../database/db.js");

// GET home page
router.get("/", function (req, res) {
  res.render("index");
});

// Data endpoint for shades
router.get("/getShade", async (req, res) => {
  try {
    const shade = await myDB.getShade();
    res.send({ shade: shade });
  } catch (e) {
    console.log("Error", e);
  }
});

router.post("/createShade", async (req, res) => {
  const dbRes = await myDB.createShade();
  res.send({ connected: dbRes });
});

module.exports = router;
