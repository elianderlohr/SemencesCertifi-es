// jwt
const jwt = require("jsonwebtoken");

const requirements = require("../service/require_session");
const database = require("../service/database");
// import dot env
require("dotenv").config({ path: require("find-config")(".env") });

var express = require("express");
var router = express.Router();

// *********************************************
// *                                           *
// *       FARMER ROUTES - ACCOUNT             *
// *                                           *
// *********************************************

// Set up a route to authenticate a user and generate a JWT token
router.post("/login", async (req, res) => {
  
  // parse phone from body as string
  const phone = req.body.phone.toString();
  // parse pin from body as 
  const pin = req.body.pin.toString();

  // check if phone and pin are set
  if (!phone || !pin) {
    return res.status(400).send("Error: Phone or pin not set");
  }

  // check if user exists
  database.pool.query(
    "SELECT * FROM ict4d.t_user_farmer WHERE phone = ?;",
    [phone],
    async (error, user) => {
      if (error) {
        return res.status(500).send("Error: Server error");
      }

      // check if user exists
      if (user.length === 0) {
        return res.status(401).send("Error: User does not exist");
      }

      if (user[0].pin !== pin) {
        return res.status(401).send("Error: Wrong pin");
      }

      // create token
      const token = jwt.sign(
        { userId: user[0].id, date: new Date(), role: "farmer" },
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
      "SELECT * FROM ict4d.t_user_farmer WHERE id = ?;",
      [userId],
      async (error, user) => {
        if (error) {
          return res.json({ loggedIn: false });
        }

        // check if user exists
        if (user.length === 0) {
          return res.json({ loggedIn: false });
        }

        // check if user is farmer
        if (role !== "farmer") {
          return res.json({ loggedIn: false });
        }

        return res.json({ loggedIn: true, userId: userId, role: "farmer", phone: user[0].phone, language: user[0].language });
      }
    );
  } catch (err) {
    return res.json({ loggedIn: false });
  }
});

// Set up a route to log out the user
router.post("/logout", requirements.requireFarmerSession, (req, res) => {
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
    "SELECT `id`, `phone`, `signup_date`, (SELECT COUNT(*) FROM ict4d.t_certificate c WHERE c.farmer_id = f.id) AS certificates FROM ict4d.t_user_farmer f WHERE f.id = ?;",
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
  requirements.requireFarmerSession,
  async (req, res) => {
    // get user id from token
    const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // get certificates from database
    database.pool.query(
      "SELECT * FROM ict4d.t_certificate WHERE `farmer_id` = ?;",
      [userId],
      async (error, certificate) => {
        if (error) {
          return res.status(500).send("Error: Server error");
        }

        return res.status(200).send(certificate);
      }
    );
  }
);

module.exports = router;
