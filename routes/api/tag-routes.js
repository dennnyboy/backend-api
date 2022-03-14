const router = require('express').Router();
const {
  Tag,Product,ProductTag} = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
      attributes: ['id', 'Tag_name'],
      include: {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ],
      }
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products",
      },
    ],
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(404)
          .json({ message: "There was no tag found with this id." });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//create a new tag
router.post('/', (req, res) => {
  Tag.create({
      tag_name: req.body.tag_name
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({
        message: 'No tag found with this id'
        });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;