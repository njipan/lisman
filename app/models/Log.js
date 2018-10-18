const Sequelize = require("sequelize");
const db = require("../databases");

const Log = db.define(
  "logs",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    referrer: {
      type: Sequelize.STRING,
      allowNull: false
    },
    event: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = Log;
