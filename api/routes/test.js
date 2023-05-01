var express = require("express");
var router = express.Router();

const js2xmlparser = require("js2xmlparser");

// *********************************************
// *                                           *
// *       FARMER ROUTES - ACCOUNT             *
// *                                           *
// *********************************************

// Set up a route to authenticate a user and generate a JWT token
router.get("/withoutEncoding", async (req, res) => {
  // create object
  const info = {
    name: "ICT4D",
    version: "1.0.0",
    description: "ICT4D API",
  };

  // return object as xml
  res.set("Content-Type", "text/xml");
  res.send(
    js2xmlparser.parse("info", info)
  );
});
// Set up a route to authenticate a user and generate a JWT token
router.get("/withEncoding", async (req, res) => {
  // create object
  const info = {
    name: "ICT4D",
    version: "1.0.0",
    description: "ICT4D API",
  };

  // return object as xml
  res.set("Content-Type", "text/xml");
  res.send(
    js2xmlparser.parse("info", info, { declaration: { encoding: "UTF-8" } })
  );
});


router.get("/docuExample", async (req, res) => {
  res.set("Content-Type", "text/xml");
  res.send(`<?xml version="1.0"?>
  <?access-control allow="*"?>
  <quote>
    <ticker>F</ticker>
    <name>Ford Motor Company</name>
    <change>1.00</change>
    <last>30.00</last>
  </quote>
  `);
});

router.get("/docuExampleApplicationHeader", async (req, res) => {
  res.set("Content-Type", "application/xml");
  res.send(`<?xml version="1.0"?>
  <?access-control allow="*"?>
  <quote>
    <ticker>F</ticker>
    <name>Ford Motor Company</name>
    <change>1.00</change>
    <last>30.00</last>
  </quote>
  `);
});

router.get("/docuExampleApplicationHeader.xml", async (req, res) => {
  res.set("Content-Type", "application/xml");
  res.send(`<?xml version="1.0"?>
  <?access-control allow="*"?>
  <quote>
    <ticker>F</ticker>
    <name>Ford Motor Company</name>
    <change>1.00</change>
    <last>30.00</last>
  </quote>
  `);
});

// Set up a route to authenticate a user and generate a JWT token
router.get("/withNamespace", async (req, res) => {
  // create object
  const info = {
    "@": {
      xmlns: "https://api.semencescertifiees.elch.cc/test/namespace",
    },
    info: {
      name: "ICT4D",
      version: "1.0.0",
      description: "ICT4D API",
    },
  };

  // return object as xml
  res.set("Content-Type", "text/xml");
  res.send(
    js2xmlparser.parse("info", info, { declaration: { encoding: "UTF-8" } })
  );
});

router.get("/namespace",
  async (req, res) => {
    // create object
    res.set("Content-Type", "text/xml");
    res.send(`<?xml version="1.0" encoding="utf-8"?>
    <!-- Created with Liquid Technologies Online Tools 1.0 (https://www.liquid-technologies.com) -->
    <xs:schema xmlns:ns="some_identifier" attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">
      <xs:element name="info">
        <xs:complexType>
          <xs:sequence>
            <xs:element name="info">
              <xs:complexType>
                <xs:sequence>
                  <xs:element name="name" type="xs:string" />
                  <xs:element name="version" type="xs:string" />
                  <xs:element name="description" type="xs:string" />
                </xs:sequence>
              </xs:complexType>
            </xs:element>
          </xs:sequence>
        </xs:complexType>
      </xs:element>
    </xs:schema>`);
});


// Set up a route to authenticate a user and generate a JWT token
router.post("/post", async (req, res) => {
  const test = req.body;

  // create object
  const info = {
    name: "ICT4D",
    version: "1.0.0",
    description: "ICT4D API",
    value: test,
  };

  // return object as xml
  res.set("Content-Type", "text/xml");
  res.send(
    js2xmlparser.parse("info", info, { declaration: { encoding: "UTF-8" } })
  );
});

module.exports = router;
