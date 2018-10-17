const Sequelize = require("sequelize");
// const timezone = "Asia/Jakarta";
// require("moment").tz.setDefault(timezone);

const seq = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: Sequelize.Op
    //timezone: timezone
  }
);

module.exports = seq;
