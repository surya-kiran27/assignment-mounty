var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("<center><h1>Welcome to express!</h1></h></center>");
});

module.exports = router;
