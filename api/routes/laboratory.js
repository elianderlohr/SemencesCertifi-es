// jwt
const jwt = require("jsonwebtoken");

const database = require("../service/database");
const requirements = require("../service/require_session");
// import dot env
require("dotenv").config({ path: require("find-config")(".env") });

var express = require("express");
var router = express.Router();

// *********************************************
// *                                           *
// *       LABORATORY ROUTES - ACCOUNT         *
// *                                           *
// *********************************************

// Set up a route to authenticate a user and generate a JWT token
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // check if phone and pin are set
  if (!username || !password) {
    return res.status(400).send("Error: Username or Password not set");
  }

  // check if user exists
  database.pool.query(
    "SELECT * FROM ict4d.t_user_laboratory WHERE username = ?;",
    [username],
    async (error, user) => {
      if (error) {
        return res.status(500).send("Error: Server error");
      }

      // check if user exists
      if (user.length === 0) {
        return res.status(401).send("Error: User does not exist");
      }

      if (user[0].password !== password) {
        return res.status(401).send("Error: Wrong password");
      }

      // create token
      const token = jwt.sign(
        { userId: user[0].id, date: new Date(), role: "laboratory" },
        process.env.JWT_SECRET
      );

      // set session token
      req.session.token = token;

      res.send("Login successful");
    }
  );
});

// Set up a route to get the user ID from the session
router.get("/signedin", async (req, res) => {
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
    const role = decoded.role;

    // get user info from database
    database.pool.query(
      "SELECT * FROM ict4d.t_user_laboratory WHERE id = ?;",
      [userId],
      async (error, user) => {
        if (error) {
          return res.json({ loggedIn: false });
        }

        // check if user exists
        if (user.length === 0) {
          return res.json({ loggedIn: false });
        }

        if (role !== "laboratory") {
          return res.json({ loggedIn: false });
        }

        return res.json({
          loggedIn: true,
          userId: userId,
          role: "laboratory",
          username: user[0].username,
        });
      }
    );
  } catch (err) {
    return res.json({ loggedIn: false });
  }
});

// Set up a route to log out the user
router.post("/logout", requirements.requireLaboratorySession, (req, res) => {
  // decode token
  const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);

  // delete session token
  req.session.token = null;
  delete req.session.token;
  req.session.destroy();

  return res.send("Logout successful");
});

// Set up a route to get the user info
router.post("/account", async (req, res) => {
  // get user id from token
  const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  // get user from database syncronously
  database.pool.query(
    "SELECT `id`, `username`, `signup_date`, (SELECT COUNT(*) FROM ict4d.t_certificate c WHERE c.laboratory_id = l.id) AS certificates FROM ict4d.t_user_laboratory l WHERE l.id = ?;",
    [userId],
    async (error, user) => {
      if (error) {
        return res.status(500).send("Error: Server error");
      }
      return res.send(user[0]);
    }
  );
});

// *********************************************
// *                                           *
// *       FARMER ROUTES - CERTIFICATES        *
// *                                           *
// *********************************************

// Set up a route to get the user certificates
router.get(
  "/certificates",
  requirements.requireLaboratorySession,
  async (req, res) => {
    // get user id from token
    const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // search
    const search = req.query.search;

    if (search === "") {
      // get certificates from database
      database.pool.query(
        "SELECT c.*, f.phone FROM ict4d.t_certificate c, ict4d.t_user_farmer f WHERE c.farmer_id = f.id AND c.laboratory_id = ?;",
        [userId],
        async (error, certificate) => {
          if (error) {
            return res.status(500).send("Error: Server error");
          }

          return res.status(200).send(certificate);
        }
      );
    } else {
      // get certificates from database
      database.pool.query(
        "SELECT c.*, f.phone FROM ict4d.t_certificate c, ict4d.t_user_farmer f WHERE c.farmer_id = f.id AND c.laboratory_id = ? AND f.phone LIKE ?;",
        [userId, "%" + search + "%"],
        async (error, certificate) => {
          if (error) {
            return res.status(500).send("Error: Server error");
          }

          return res.status(200).send(certificate);
        }
      );
    }
  }
);

module.exports = router;
