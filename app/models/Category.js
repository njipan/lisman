const Sequelize = require("Sequelize");
const db = require("../databases");

const Category = db.define(
  "categories",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Category;
