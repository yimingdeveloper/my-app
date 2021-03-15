const express = require("express");
const router = express.Router();
const myDB = require("../database/db.js");

// GET home page
router.get("/", function (req, res) {
  res.render("index");
});

// Data endpoint for shades
router.get("/getShade/:rVal/:gVal/:bVal", async (req, res) => {
  let R = parseInt(req.params.rVal);
  let G = parseInt(req.params.gVal);
  let B = parseInt(req.params.bVal);
  try {
    const shade = await myDB.getShade({ r: R, g: G, b: B });
    res.send({ shade: shade });
  } catch (e) {
    console.log("Error", e);
  }
});

router.post("/createShade", async (req, res) => {
  const dbRes = await myDB.createShade();
  res.send({ result: dbRes });
});

module.exports = router;
