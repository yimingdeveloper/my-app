var express = require("express");
var router = express.Router();
// const myDB = require("../public/javascripts/db.js");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

// router.get("/getFiles", async (req, res) => {
//   const files = await myDB.getFiles();
//   res.send({ files: files });
// });

module.exports = router;
