const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      { model: Product }
    ]
  })
  .then(categories => res.json(categories))
  .catch(err => {
    if (err) {
      console.log(err);
    }
    res.status(500).json(err);
  });
});

// get single category
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product
    }]
  })
  .then(categories => {
    if (!categories) {
      res.status(404).json({ message: 'No category found with that ID' });
      return;
    }
    res.json(categories)
  })
  .catch(err => {
    if (err) {
      console.log(err);
    }
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
