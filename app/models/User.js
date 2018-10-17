const Sequelize = require("sequelize");
const db = require("../databases");

const User = db.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = User;
