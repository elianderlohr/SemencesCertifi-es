const database = require("./database");

// import dot env
require("dotenv").config({ path: require("find-config")(".env") });

// import jwt
const jwt = require("jsonwebtoken");

async function requireFarmerSession(req, res, next) {
  if (!req.session.token) {
    res.status(400).send("No active session");
  } else {
    // check if token is still active and valid
    jwt.verify(
      req.session.token,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        if (err) {
          res.status(400).send("Session expired");
        } else {
          const role = decoded.role;

          if (role !== "farmer") {
            res.status(400).send("Wrong role");
          }

          // token is valid
          next();
        }
      }
    );
  }
}

async function requireLaboratorySession(req, res, next) {
  if (!req.session.token) {
    res.status(400).send("No active session");
  } else {
    // check if token is still active and valid
    jwt.verify(
      req.session.token,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        if (err) {
          res.status(400).send("Session expired");
        } else {
          const role = decoded.role;

          if (role !== "laboratory") {
            res.status(400).send("Wrong role");
          }

          // token is valid
          next();
        }
      }
    );
  }
}

// export the function
module.exports = { requireFarmerSession, requireLaboratorySession };
