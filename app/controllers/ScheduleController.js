const router = require("express").Router();
const Joi = require("joi");
const Op = require("sequelize").Op;
const { ScheduleSchema } = require("../schemas");
const { Schedule, Subject, Audio, Category } = require("../models");

router.get("/", async (req, res) => {
  const search = req.query.search || "%";
  const page = parseInt(req.query.page) || 1;
  const perPage = 2;
  await Schedule.findAndCountAll({
    include: [
      {
        model: Audio,
        where: {
          name: {
            [Op.like]: `%${search}%`
          }
        },
        include: [
          {
            model: Category,
            where: {
              name: {
                [Op.like]: `%${search}%`
              }
            }
          }
        ]
      },
      {
        model: Subject,
        where: {
          name: {
            [Op.like]: `%${search}%`
          }
        }
      }
    ],
    where: {
      description: {
        [Op.like]: `%${search}%`
      },
      class: {
        [Op.like]: `%${search}%`
      }
    },
    offset: (page - 1) * perPage,
    limit: perPage,
    subQuery: false
  }).then(result => {
    if (result.count <= 0) {
      res.json(null);
      return;
    }

    res.send({
      datas: result.rows,
      total_page: Math.ceil(parseInt(result.count) / perPage),
      current_page: page
    });
  });
});

router.post("/", async (req, res) => {
  const data = req.body;
  Joi.validate(data, ScheduleSchema, (err, value) => {
    if (err) {
      res.send({
        status: "error"
      });
    } else {
      Schedule.create({
        subject_id: data.subject_id,
        audio_id: data.audio_id,
        description: data.description,
        class: data.class,
        time_start: new Date(data.time_start),
        time_end: new Date(data.time_end),
        status: data.status
      }).then(() => {
        res.sendStatus(200);
      });
    }
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Schedule.findOne({
    include: [Audio, Subject],
    where: { id: id }
  }).then(result => {
    res.send(result);
  });
});

router.put("/:id", async (req, res) => {
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
