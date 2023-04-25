const mysql = require("mysql");

// import dot env
require("dotenv").config({ path: require("find-config")(".env") });

// Connection parameters
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

module.exports = {
  pool,
};
