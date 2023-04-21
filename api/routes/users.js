const bcrypt = require("bcrypt");
const saltRounds = 10;

// jwt
const jwt = require("jsonwebtoken");

// requireSession import
const requireSession = require("../service/require_session");

const database = require("../service/database");
// import dot env
require("dotenv").config({ path: require("find-config")(".env") });

var express = require("express");
var router = express.Router();

// configs
const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
const passwortRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// TODO PLACEHOLDER REPLACE ASAP

// Set up a route to authenticate a user and generate a JWT token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // ensure email follows the rules
  if (!emailRegex.test(email)) {
    return res.status(400).send("Error: Invalid email.");
  }

  if (!passwortRegex.test(password)) {
    return res.status(400).send("Error: Invalid password.");
  }

  // get user from database syncronously
  database.pool.query(
    "SELECT * FROM studysmart.t_user WHERE email = ?;",
    [email],
    async (error, user) => {
      if (error) {
        return res.status(500).send(error);
      }

      if (user.length === 0) {
        return res.status(401).send("Invalid email or password");
      }

      // check if hash of password matches hash in database
      const match = await bcrypt.compare(password, user[0].password);
      if (!match) {
        return res.status(401).send("Invalid email or password");
      }

      // get SESSION_DURATION_DAYS from settings database
      const SESSION_DURATION_DAYS = await getSetting("SESSION_DURATION_DAYS");

      const expiringDate = new Date(
        Date.now() + 1000 * 60 * 60 * 24 * SESSION_DURATION_DAYS
      );

      // Update session
      const tokenObject = {
        userId: user[0].id,
        timestamp: Date.now(),
        expiringDate: expiringDate,
        role: user[0].role,
        random: Math.random(),
      };

      const token = jwt.sign(tokenObject, process.env.JWT_SECRET);

      req.session.token = token;

      try {
        // save token to database
        database.pool.query(
          "INSERT INTO studysmart.t_user_session(`user_id`, `token`, `expiring_date`) VALUES (?, ?, ?)",
          [user[0].id, token, expiringDate],
          function (err, result) {
            if (err) return res.status(500).send(err);
            return res.send("Login successful");
          }
        );
      } catch (error) {
        return res.status(500).send(err);
      }
    }
  );
});

// Set up a route to get the user ID from the session
router.get("/logged_in", async (req, res) => {
  // check if session token is set, if not set session token
  if (!req.session.token && res.locals.token)
    req.session.token = res.locals.token;
  else if (!req.session.token && !res.locals.token)
    return res.json({ loggedIn: false });

  // Logic
  const token = req.session.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // check if token is still active
    database.pool.query(
      "SELECT * FROM studysmart.t_user_session WHERE token = ? AND user_id = ? AND active = 1;",
      [token, userId],
      async (error, user) => {
        if (error) {
          return res.status(500).send("Error: Server error");
        }

        if (user.length === 0) {
          return res.json({ loggedIn: false });
        }
        res.json({ userId: userId, loggedIn: true, role: decoded.role });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(401).send("Invalid token");
  }
});

// Set up a route to log out the user
router.post("/logout", (req, res) => {
  // decode token
  const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  // set session in database to not active
  database.pool.query(
    "UPDATE studysmart.t_user_session SET active = 0, logout_date = CURRENT_TIMESTAMP WHERE token = ? AND user_id = ?;",
    [req.session.token, userId],
    function (err, result) {
      if (err) return res.status(500).send("Error: Server error");

      // delete session token
      req.session.token = null;
      delete req.session.token;
      req.session.destroy();

      return res.send("Logout successful");
    }
  );
});

// Set up a route to get the user info
router.post(
  "/account",
  async (req, res) => {
    // get user id from token
    const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // get user from database syncronously
    database.pool.query(
      "SELECT username, email, role FROM studysmart.t_user WHERE id = ?;",
      [userId],
      async (error, user) => {
        if (error) {
          return res.status(500).send("Error: Server error");
        }
        return res.send(user[0]);
      }
    );
  }
);


module.exports = router;
