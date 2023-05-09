const js2xmlparser = require("js2xmlparser");
const xmlparser = require("express-xml-bodyparser");
const database = require("../service/database");
require("dotenv").config({ path: require("find-config")(".env") });

var express = require("express");
var router = express.Router();

// check if user exists
router.post(
  "/user-exists.xml",
  xmlparser({ trim: false, explicitArray: false }),
  function (req, res, next) {
    const apiKey = req.body.data.apikey;
    const phone = req.body.data.phone;

    let result = {};

    res.set("Content-Type", "text/xml");

    if (apiKey === process.env.VOICEXML_API_KEY) {
      // check if user exists
      database.pool.query(
        "SELECT * FROM ict4d.t_user_farmer WHERE phone = ?;",
        [phone],
        async (error, user) => {
          if (error) {
            result.Header = {
              Response: {
                Code: 500,
                Message: "Server Error",
              },
            };

            return res.status(500).send(
              js2xmlparser.parse("Info", result, {
                declaration: { encoding: "UTF-8" },
              })
            );
          }

          // check if user exists
          if (user.length === 0) {
            result.Header = {
              Response: {
                Code: 401,
                Message: "User does not exist",
              },
            };

            return res.status(401).send(
              js2xmlparser.parse("Info", result, {
                declaration: { encoding: "UTF-8" },
              })
            );
          } else {
            result.Header = {
              Response: {
                Code: 200,
                Message: "User exists",
              },
            };

            result.Body = {
              Farmer: {
                Id: user[0].id,
                Language: user[0].language,
              },
            };

            return res.status(200).send(
              js2xmlparser.parse("Info", result, {
                declaration: { encoding: "UTF-8" },
              })
            );
          }
        }
      );
    } else {
      result.Header = {
        Response: {
          Code: 401,
          Message: "Unauthorized, wrong API Key",
        },
      };

      res.status(401).send(
        js2xmlparser.parse("Info", result, {
          declaration: { encoding: "UTF-8" },
        })
      );
    }
  }
);

// get all certificates by page and phoen
router.post(
  "/certificates.xml",
  xmlparser({ trim: false, explicitArray: false }),
  function (req, res, next) {
    const apiKey = req.body.data.apikey;
    const phone = req.body.data.phone;
    const page = req.body.data.page;

    // certificates per page
    const perPage = 7;

    const offset = (page - 1) * perPage;

    let result = {};

    res.set("Content-Type", "text/xml");

    if (apiKey === process.env.VOICEXML_API_KEY) {
      database.pool.query(
        "SELECT * FROM ict4d.t_user_farmer WHERE phone = ?;",
        [phone],
        async (error, user) => {
          if (error) {
            result.Header = {
              Response: {
                Code: 500,
                Message: "Server Error",
              },
            };

            return res.status(500).send(
              js2xmlparser.parse("Info", result, {
                declaration: { encoding: "UTF-8" },
              })
            );
          }

          // check if user exists
          if (user.length === 0) {
            result.Header = {
              Response: {
                Code: 401,
                Message: "User does not exist",
              },
            };

            return res.status(500).send(
              js2xmlparser.parse("Info", result, {
                declaration: { encoding: "UTF-8" },
              })
            );
          } else {
            // get certificates
            database.pool.query(
              "SELECT c.* FROM ict4d.t_certificate c, ict4d.t_user_farmer f WHERE c.farmer_id = f.id AND f.phone = ? LIMIT ? OFFSET ?;",
              [phone, perPage, offset],
              async (error, certificates) => {
                if (error) {
                  result.Header = {
                    Response: {
                      Code: 500,
                      Message: "Server Error",
                    },
                  };

                  return res.status(500).send(
                    js2xmlparser.parse("Info", result, {
                      declaration: { encoding: "UTF-8" },
                    })
                  );
                }

                // check if user exists
                if (certificates.length === 0) {
                  result.Header = {
                    Response: {
                      Code: 401,
                      Message: "No certificates found",
                    },
                  };

                  return res.status(500).send(
                    js2xmlparser.parse("Info", result, {
                      declaration: { encoding: "UTF-8" },
                    })
                  );
                } else {
                  // count certificates
                  database.pool.query(
                    "SELECT COUNT(*) as count FROM ict4d.t_certificate c, ict4d.t_user_farmer f WHERE c.farmer_id = f.id AND f.phone = ?;",
                    [phone],
                    async (error, count) => {
                      if (error) {
                        result.Header = {
                          Response: {
                            Code: 500,
                            Message: "Server Error",
                          },
                        };

                        return res.status(500).send(
                          js2xmlparser.parse("Info", result, {
                            declaration: { encoding: "UTF-8" },
                          })
                        );
                      }

                      result.Header = {
                        Response: {
                          Code: 200,
                          Message: "Certificates found",
                        },
                      };
                      result.Body = {
                        Certificates: {
                          Count: count[0].count,
                          Certificate: certificates,
                        },
                      };

                      res.status(200).send(
                        js2xmlparser.parse("Info", result, {
                          declaration: { encoding: "UTF-8" },
                        })
                      );
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else {
      result.Header = {
        Response: {
          Code: 401,
          Message: "Unauthorized, wrong API Key",
        },
      };

      res.status(401).send(
        js2xmlparser.parse("Info", result, {
          declaration: { encoding: "UTF-8" },
        })
      );
    }
  }
);

// get single certificate using certificate id and phone number
router.post(
  "/certificate.xml",
  xmlparser({ trim: false, explicitArray: false }),
  function (req, res, next) {
    const apiKey = req.body.data.apikey;
    const phone = req.body.data.phone;
    const certificateId = req.body.data.certificateid;

    let result = {};

    res.set("Content-Type", "text/xml");

    if (apiKey === process.env.VOICEXML_API_KEY) {
      database.pool.query(
        "SELECT * FROM ict4d.t_user_farmer WHERE phone = ?;",
        [phone],
        async (error, user) => {
          if (error) {
            result.Header = {
              Response: {
                Code: 500,
                Message: "Server Error",
              },
            };

            return res.status(500).send(
              js2xmlparser.parse("Info", result, {
                declaration: { encoding: "UTF-8" },
              })
            );
          }

          // check if user exists
          if (user.length === 0) {
            result.Header = {
              Response: {
                Code: 401,
                Message: "User does not exist",
              },
            };

            return res.status(500).send(
              js2xmlparser.parse("Info", result, {
                declaration: { encoding: "UTF-8" },
              })
            );
          } else {
            // get certificate
            database.pool.query(
              "SELECT * FROM ict4d.t_certificate c, ict4d.t_user_farmer f WHERE c.farmer_id = f.id AND f.phone = ? AND c.id = ?;",
              [phone, certificateId],
              async (error, certificate) => {
                if (error) {
                  result.Header = {
                    Response: {
                      Code: 500,
                      Message: "Server Error",
                    },
                  };

                  return res.status(500).send(
                    js2xmlparser.parse("Info", result, {
                      declaration: { encoding: "UTF-8" },
                    })
                  );
                }

                // check if user exists
                if (certificate.length === 0) {
                  result.Header = {
                    Response: {
                      Code: 401,
                      Message: "Certificate not found",
                    },
                  };

                  return res.status(500).send(
                    js2xmlparser.parse("Info", result, {
                      declaration: { encoding: "UTF-8" },
                    })
                  );
                } else {
                  result.Header = {
                    Response: {
                      Code: 200,
                      Message: "Certificate found",
                    },
                  };
                  result.Body = {
                    certificate: certificate[0],
                  };

                  res.status(200).send(
                    js2xmlparser.parse("Info", result, {
                      declaration: { encoding: "UTF-8" },
                    })
                  );
                }
              }
            );
          }
        }
      );
    } else {
      result.Header = {
        Response: {
          Code: 401,
          Message: "Unauthorized, wrong API Key",
        },
      };

      res.status(401).send(
        js2xmlparser.parse("Info", result, {
          declaration: { encoding: "UTF-8" },
        })
      );
    }
  }
);

module.exports = router;
