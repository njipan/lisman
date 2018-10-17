const Sequelize = require("sequelize");
const db = require("../databases");

const AudioCategory = db.define(
  "audio_categories",
  {
    audio_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = AudioCategory;
