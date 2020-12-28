const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  console.log("=======");
  Tag.findAll({
    attributes: [
      'id',
      'tag_name',
    ]
  }).then(dbtag => {
    if (!dbtag) {
      res.status(404).json({ message: "No tag found with this id" });
      return;
    }
    res.json(dbtag);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name',
    ]
  })
    .then(dbtag => {
      if (!dbtag) {
        res.status(404).json({ message: 'No tag found with this tag' });
        return;
      }
      res.json(dbtag);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_id: req.body.tag_id,
    tag_name: req.body.tag_name,
  })
    .then(dbtag => res.json(dbtag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  }).then(dbtag => {
    if (!dbtag[0]) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbtag);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbtag => {
      if (!dbtag) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbtag);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
