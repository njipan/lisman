const ScheduleController = require("./ScheduleController");
const SubjectController = require("./SubjectController");
const CategoryController = require("./CategoryController");
const AudioController = require("./AudioController");

const controllers = {
  ScheduleController: ScheduleController,
  SubjectController: SubjectController,
  CategoryController: CategoryController,
  AudioController: AudioController
};

module.exports = controllers;
