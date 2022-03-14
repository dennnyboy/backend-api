const router = require('express').Router();
const  { Category,Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
router.get('/', (req, res) => {
  Category.findAll({
      attributes: ['id', 'category_name'],
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
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
      attributes: ['id', 'category_name'],
      where: {
        id: req.params.id
      },
      include: [{
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }]
    })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({
          message: 'There is not catagory with this id'
        });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// create a new category
router.post('/', (req, res) => {
  Category.create({
    Category_name: req.body.Category_name,
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update( 
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    } 
  )
  .then(categoryData => {
    if (!categoryData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'There is not catagory with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;