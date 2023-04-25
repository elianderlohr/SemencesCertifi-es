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
// *             CERTIFICATE ROUTES            *
// *                                           *
// *********************************************

// PARAM: `farmer_id`, `laboratory_id`, `species`, `campaign`, `germination`, `variety`, `batch_number`, `purity`

// Set up a route and add a certificate
router.post("/", requirements.requireLaboratorySession, async (req, res) => {
  const {
    phone,
    pin,
    species,
    campaign,
    germination,
    variety,
    batch_number,
    purity,
  } = req.body;

  const token = req.session.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "laboratory") {
    return res.status(401).send("Error: Wrong role");
  }

  const laboratory_id = decoded.userId;

  // check if phone and pin are set
  if (!phone || !pin) {
    return res.status(400).send("Error: Phone or pin not set");
  }

  // check if user exists
  database.pool.query(
    "SELECT * FROM " + database.getDatabase() + ".t_user_farmer WHERE phone = ?;",
    [phone],
    async (error, user) => {
      if (error) {
        return res.status(500).send("Error: Server error");
      }

      // check if user exists
      if (user.length === 0) {
        console.log("User does not exist");
        // Create new user
        database.pool.query(
          "INSERT INTO " + database.getDatabase() + ".t_user_farmer (phone, pin) VALUES (?, ?);",
          [phone, pin],
          async (error, newUser) => {
            if (error) {
              return res.status(500).send("Error: Server error");
            }

            // Create certificate
            database.pool.query(
              "INSERT INTO " + database.getDatabase() + ".t_certificate (`farmer_id`, `view_id`, `laboratory_id`, `species`, `campaign`, `germination`, `variety`, `batch_number`, `purity`) VALUES (?, FLOOR(RAND() * 90000) + 10000, ?, ?, ?, ?, ?, ?, ?);",
              [
                newUser.insertId,
                laboratory_id,
                species,
                campaign,
                germination,
                variety,
                batch_number,
                purity,
              ],
              async (error, certificate) => {
                if (error) {
                  return res.status(500).send("Error: Server error");
                }

                return res.status(200).send({ id: certificate.insertId });
              }
            );
          }
        );
      } else {
        // Update pin
        database.pool.query(
          "UPDATE " + database.getDatabase() + ".t_user_farmer SET pin = ? WHERE phone = ?;",
          [pin, phone],
          async (error, _) => {
            if (error) {
              return res.status(500).send("Error: Server error");
            }

            // Create certificate
            database.pool.query(
              "INSERT INTO " + database.getDatabase() + ".t_certificate (`farmer_id`, `view_id`, `laboratory_id`, `species`, `campaign`, `germination`, `variety`, `batch_number`, `purity`) VALUES (?, FLOOR(RAND() * 90000) + 10000, ?, ?, ?, ?, ?, ?, ?);",
              [
                user[0].id,
                laboratory_id,
                species,
                campaign,
                germination,
                variety,
                batch_number,
                purity,
              ],
              async (error, certificate) => {
                if (error) {
                  return res.status(500).send(error);
                }

                return res.status(200).send({ id: certificate.insertId });
              }
            );
          }
        );
      }
    }
  );
});

// Set up a route to update a certificate
router.post(
  "/update",
  requirements.requireLaboratorySession,
  async (req, res) => {
    const {
      id,
      species,
      campaign,
      germination,
      variety,
      batch_number,
      purity,
    } = req.body;

    const token = req.session.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "laboratory") {
      return res.status(401).send("Error: Wrong role");
    }

    const laboratory_id = decoded.userId;

    // update certificate
    database.pool.query(
      "UPDATE " + database.getDatabase() + ".t_certificate SET `species` = ?, `campaign` = ?, `germination` = ?, `variety` = ?, `batch_number` = ?, `purity` = ? WHERE `id` = ? AND `laboratory_id` = ?;",
      [
        species,
        campaign,
        germination,
        variety,
        batch_number,
        purity,
        id,
        laboratory_id,
      ],
      async (error, certificate) => {
        if (error) {
          return res.status(500).send("Error: Server error");
        }

        return res.status(200).send({ id: id });
      }
    );
  }
);

// Set up a route to delete a certificate
router.delete("/", requirements.requireLaboratorySession, async (req, res) => {
  const { id } = req.body;

  const token = req.session.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "laboratory") {
    return res.status(401).send("Error: Wrong role");
  }

  const laboratory_id = decoded.userId;

  // delete certificate
  database.pool.query(
    "DELETE FROM " + database.getDatabase() + ".t_certificate WHERE `id` = ? AND `laboratory_id` = ?;",
    [id, laboratory_id],
    async (error, certificate) => {
      if (error) {
        return res.status(500).send("Error: Server error");
      }

      return res.status(200).send("Certificate deleted");
    }
  );
});

// Set up route to get certificate by normal id
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    // check if session exists
    if (!req.session.token) {
        return res.status(401).send("Error: Not logged in");
    }
    // get user id from token
    const token = req.session.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // do laboratory check
    if (decoded.role === "laboratory") {
        // check if certificate exists and belongs to laboratory
        database.pool.query(
            "SELECT * FROM " + database.getDatabase() + ".t_certificate WHERE `id` = ? AND `laboratory_id` = ?;",   
            [id, userId],
            async (error, certificate) => {
                if (error) {
                    return res.status(500).send("Error: Server error");
                }

                if (certificate.length === 0) {
                    return res.status(401).send("Error: Not authorized");
                }

                return res.status(200).send(certificate[0]);
            }
        );
    } else if (decoded.role === "farmer") {
        // check if certificate exists and belongs to farmer
        database.pool.query(
            "SELECT * FROM " + database.getDatabase() + ".t_certificate WHERE `id` = ? AND `farmer_id` = ?;",   
            [id, userId],
            async (error, certificate) => {
                if (error) {
                    return res.status(500).send("Error: Server error");
                }

                if (certificate.length === 0) {
                    return res.status(401).send("Error: Not authorized");
                }

                return res.status(200).send(certificate[0]);
            }
        );
    } else {
        return res.status(401).send("Error: Not authorized");
    }
});

// Set up a route to get a certificate
router.get("/view/:id", async (req, res) => {
  const id = req.params.id;

  // get certificate
  database.pool.query(
    "SELECT * FROM " + database.getDatabase() + ".t_certificate WHERE `view_id` = ?;",
    [id],
    async (error, certificate) => {
      if (error) {
        return res.status(500).send("Error: Server error");
      }

      return res.status(200).send(certificate[0]);
    }
  );
});

module.exports = router;
