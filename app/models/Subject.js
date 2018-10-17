const Sequelize = require("Sequelize");
const db = require("../databases");

const Subject = db.define(
  "subjects",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Subject;
