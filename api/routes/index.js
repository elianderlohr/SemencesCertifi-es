// import dot env
require("dotenv").config({ path: require("find-config")(".env") });

var express = require("express");
var router = express.Router();


router.get("/", function (req, res, next) {
    let dbOnline = "offline";
  // do database check
  try {
    const database = require("../service/database");

    database.pool.query(
      "SELECT 1 + 1 AS solution",
      (error, results, fields) => {
        if (error) {
          console.log(error);
          dbOnline = "offline";
        } else {
          dbOnline = "online";
        }

        res.render("index", {
          title: "API v1 - Health check",
          db: dbOnline,
          lastChecked: new Date(),
        });
      }
    );
  } catch (error) {
    console.log(error);
    dbOnline = "offline";

    res.render("index", {
      title: "API",
      db: dbOnline,
      lastChecked: new Date(),
    });
  }
});

module.exports = router;
