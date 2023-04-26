var express = require("express");
var router = express.Router();

const js2xmlparser = require("js2xmlparser");

// *********************************************
// *                                           *
// *       FARMER ROUTES - ACCOUNT             *
// *                                           *
// *********************************************

// Set up a route to authenticate a user and generate a JWT token
router.get("/info", async (req, res) => {
    // create object
    const info = {
        name: "ICT4D",
        version: "1.0.0",
        description: "ICT4D API"}
    
    // return object as xml
    res.set('Content-Type', 'text/xml');
    res.send(js2xmlparser.parse("info", info));


    });


module.exports = router;