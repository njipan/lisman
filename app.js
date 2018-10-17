require("dotenv").config();
require("./app/models");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const upload = require("express-fileupload");

const {
  ScheduleController,
  SubjectController,
  CategoryController,
  AudioController
} = require("./app/controllers");
const port = process.env.PORT || 3000;

const { Log } = require("./app/models");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  upload({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true
  })
);

app.use(function(req, res, next) {
  const ip = req.connection.remoteAddress.split(":")[3];
  if (ip.indexOf("10.22.65.") != 0) {
    res.sendStatus(403);
    return;
  }

  Log.create({
    referrer: ip,
    event: `request to ${req.originalUrl}`
  }).then(() => {
    next();
  });
});

app.use("/audios", AudioController);
app.use("/categories", CategoryController);
app.use("/schedules", ScheduleController);
app.use("/subjects", SubjectController);

app.get("/test", (req, res) => {
  console.log(req.query);
  res.send("mantap");
});

const db = require("./app/databases");
db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log("===============================================");
    console.log("NA - API - SLC");
    console.log("Listening on port " + port);
  });
});
