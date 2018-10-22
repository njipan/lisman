const router = require("express").Router();
const Joi = require("joi");
const Op = require("sequelize").Op;
const { Subject } = require("../models");
const { SubjectSchema } = require("../schemas");

router.get("/", async (req, res) => {
  const search = req.query.search || "%";
  const page = parseInt(req.query.page) || 1;
  const perPage = 2;
  await Subject.findAndCountAll({
    where: {
      name: {
        [Op.like]: `%${search}%`
      }
    },
    offset: (page - 1) * perPage,
    limit: perPage
  }).then(result => {
    if (result.count <= 0) {
      res.json(null);
      return;
    }

    res.send({
      datas: result.rows,
      total_page: parseInt(result.count) / perPage,
      current_page: page
    });
  });
});

router.post("/", async (req, res) => {
  const data = req.body;

  Joi.validate(data, SubjectSchema, (err, value) => {
    if (err) {
      res.send({
        status: "error"
      });
    } else {
      Subject.create({
        name: data.subject_name
      }).then(() => {
        res.sendStatus(200);
      });
    }
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Subject.findById(id).then(result => {
    if (result != null) res.send(result);
    else res.json(null);
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Joi.validate(data, SubjectSchema, (err, value) => {
    if (err) {
      res.send({
        status: "error"
      });
    } else {
      Subject.update({ name: data.subject_name }, { where: { id: id } }).then(
        () => {
          res.sendStatus(200);
        }
      );
    }
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Subject.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.sendStatus(200);
  });
});

module.exports = router;
