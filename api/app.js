require("dotenv").config({ path: require("find-config")(".env") });

const createError = require("http-errors");
const express = require("express");
const path = require("path");

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const jwt = require("jsonwebtoken");

global.__basedir = __dirname;

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// USE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);

  // Session
  app.use(
    session({
      name: "SemencesCertifieesEssential",
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
    })
  );

  // CORS
  const cors = require("cors");

  app.use(cors({ credentials: true, origin: "https://semencescertifiees.elch.cc" }));

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Origin",
      "https://semencescertifiees.elch.cc"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    next();
  });
} else {
  app.use(logger("dev"));
  app.use(
    session({
      key: "semenceescertifiees.essential",
      name: "SemencesCertifieesEssential",
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
    })
  );

  // CORS

  const cors = require("cors");
  app.use(cors({ credentials: true, origin: "http://localhost" }));

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    next();
  });
}

// index
app.use("/", require("./routes/index"));

// test
app.use("/test", require("./routes/test"));

// ROUTING - FARMER
app.use("/farmer/", require("./routes/farmer"));

// ROUTING - LABORATORY
app.use("/laboratory/", require("./routes/laboratory"));

// ROUTING - CERTIFICATE
app.use("/certificate/", require("./routes/certificate"));

// ROUTING - VOICEXML
app.use("/voicexml/", require("./routes/voicexml"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
