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
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(newTag => res.json(newTag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedTag => {
    if (!updatedTag) {
      res.status(404).json({ message: 'No tag found with that ID' });
      return;
    }
    res.json(updatedTag);
  })
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
  .then(deletedTag => {
    if (!deletedTag) {
      res.status(404).json({ message: 'No tag found with that ID' });
      return;
    }
    res.json(deletedTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
