const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

DB_NAME = "cleancomm_db"
DB_USER = "root"
DB_PASSWORD = "rootPW1"

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
