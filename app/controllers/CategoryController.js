const router = require("express").Router();
const Joi = require("joi");
const Op = require("sequelize").Op;
const { Category } = require("../models");
const { CategorySchema } = require("../schemas");

router.get("/", async (req, res) => {
  const search = req.query.search || "%";
  const page = parseInt(req.query.page) || 1;
  const perPage = 2;
  await Category.findAndCountAll({
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
    result.page = page;
    res.send(result);
  });
});

router.post("/", async (req, res) => {
  const data = req.body;
  Joi.validate(data, CategorySchema, (err, value) => {
    if (err) {
      res.send({
        status: "error"
      });
    } else {
      Category.create({
        name: data.category_name
      }).then(() => {
        res.sendStatus(200);
      });
    }
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Category.findById(id).then(result => {
    if (result != null) res.send(result);
    else res.json(null);
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Joi.validate(data, CategorySchema, (err, value) => {
    if (err) {
      res.send({
        status: "error"
      });
    } else {
      Category.update({ name: data.category_name }, { where: { id: id } }).then(
        () => {
          res.sendStatus(200);
        }
      );
    }
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Category.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.sendStatus(200);
  });
});

module.exports = router;
