const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      { 
      model: Product,
      as: 'products'
    }
    ]
  })
  .then(tags => res.json(tags))
  .catch(err => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

// get single tag
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        as: 'products'
      }
    ]
  })
  .then(tags => {
    if (!tags) {
      res.status(404).json({ message: 'No tag found with that ID' });
      return;
    }
    res.json(tags);
  })
  .catch(err => {
    if(err) {
      console.log(err);
      res.status(500).json(err);
    }
  })
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
