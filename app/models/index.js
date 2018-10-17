const Audio = require("./Audio");
const AudioCategory = require("./AudioCategory");
const Category = require("./Category");
const Log = require("./Log");
const Schedule = require("./Schedule");
const Subject = require("./Subject");
const User = require("./User");

const models = {
  Audio: Audio,
  AudioCategory: AudioCategory,
  Category: Category,
  Log: Log,
  Schedule: Schedule,
  Subject: Subject,
  User: User
};

Audio.belongsToMany(Category, {
  as: "Categories",
  through: { model: AudioCategory, unique: false },
  foreignKey: "audio_id"
});
Category.belongsToMany(Audio, {
  as: "Audios",
  through: { model: AudioCategory, unique: false },
  foreignKey: "category_id"
});

Schedule.belongsTo(Subject, { foreignKey: "subject_id", target: "subject_id" });
Subject.hasMany(Schedule, { foreignKey: "subject_id", target: "subject_id" });

Schedule.belongsTo(Audio, { foreignKey: "audio_id", target: "audio_id" });
Audio.hasMany(Schedule, { foreignKey: "audio_id", target: "audio_id" });

module.exports = models;
