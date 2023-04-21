const database = require("./database");

// import dot env
require("dotenv").config({ path: require("find-config")(".env") });

// import jwt
const jwt = require("jsonwebtoken");


async function requireSession(req, res, next) {
  if (!req.session.token) {
    req.send("No active session")
  } else {
    // check if token is still active and valid
    jwt.verify(
      req.session.token,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        if (err) {
          req.send("Session expired")
        } else {
          // token is valid

          next();
        }
      }
    );
  }
}

// export the function
module.exports = requireSession;
