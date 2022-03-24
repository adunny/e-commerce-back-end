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

// create new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(newCategory => res.json(newCategory))
  .catch(err => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

// update category
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedCategory => {
    if(!updatedCategory[0]) {
      res.status(404).json({ message: 'No category found with that ID' });
      return;
    }
    res.json(updatedCategory)
  })
  .catch(err => {
    if(err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

// delete category
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletedCategory => {
    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with that ID' });
      return;
    }
    res.json(deletedCategory);
  })
  .catch(err => {
    if (err) {
      console.log(err);
      res.status(500).json(err)
    }
  });
});

module.exports = router;
