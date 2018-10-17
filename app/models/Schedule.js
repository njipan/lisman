const Sequelize = require("Sequelize");
const db = require("../databases");

const Schedule = db.define(
  "schedules",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    subject_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    audio_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    class: {
      type: Sequelize.STRING,
      allowNull: false
    },
    time_start: {
      type: Sequelize.DATE,
      allowNull: false
    },
    time_end: {
      type: Sequelize.DATE,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "READY"
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    defaultScope: {
      attributes: {
        exclude: ["audio_id", "subject_id"]
      }
    }
  }
);

module.exports = Schedule;
