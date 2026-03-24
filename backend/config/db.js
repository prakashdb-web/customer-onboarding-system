const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0123",
  database: "customer_db",
  port: 3306
});

module.exports = pool;