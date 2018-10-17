const ScheduleSchema = require("./ScheduleSchema");
const SubjectSchema = require("./SubjectSchema");
const CategorySchema = require("./CategorySchema");
const AudioSchema = require("./AudioSchema");

const validators = {
  ScheduleSchema: ScheduleSchema,
  SubjectSchema: SubjectSchema,
  CategorySchema: CategorySchema,
  AudioSchema: AudioSchema
};

module.exports = validators;
