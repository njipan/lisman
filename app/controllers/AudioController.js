const router = require("express").Router();
const Joi = require("joi");
const Op = require("sequelize").Op;

const { Audio, Category } = require("../models");
const { AudioSchema } = require("../schemas");
const { AudioFilter } = require("../util/filters");

router.get("/", async (req, res) => {
  const search = req.query.search || "%";
  const page = parseInt(req.query.page) || 1;
  const perPage = 2;
  await Audio.findAndCountAll({
    include: [
      {
        model: Category,
        as: "Categories",
        where: {
          name: {
            [Op.like]: `%${search}%`
          }
        }
      }
    ],
    where: {
      name: {
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

router.post("/test/upload", async (req, res) => {
  const file = req.files.audio_file;
  if (!file) {
    res.sendStatus(500);
    return;
  }

  if (!AudioFilter.includes(file.mimetype)) {
    res.sendStatus(500);
    return;
  }

  file.mv("uploads/audios/" + file.name).then(err => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.post("/", async (req, res) => {
  /*
    @Request Body :
    categories : []
    audio_name : string
  */
  const data = req.body;
  const file = req.files.audio_file;
  data.categories = JSON.parse(data.categories);

  Joi.validate(data, AudioSchema, (err, value) => {
    if (err) {
      res.send({
        status: "error"
      });
      return;
    }
    if (!file) {
      res.sendStatus(500);
      return;
    }
    if (!AudioFilter.includes(file.mimetype)) {
      res.sendStatus(500);
      return;
    }

    Category.findAll({
      where: {
        id: data.categories
      }
    }).then(categories => {
      Audio.create({
        name: data.audio_name,
        path: "dummy"
      }).then(audio => {
        audio.setCategories(categories);
        file.mv("uploads/audios/" + file.name).then(err => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.sendStatus(200).send(audio);
          }
        });
      });
    });
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Audio.findOne({
    where: { id: id },
    include: [
      {
        model: Category,
        as: "Categories"
      }
    ]
  }).then(result => {
    if (result != null) res.send(result);
    else res.json(null);
  });
});

//not yet
router.put("/:id", async (req, res) => {
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Audio.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.sendStatus(200);
  });
});

module.exports = router;
