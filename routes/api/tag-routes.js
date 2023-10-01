const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(allTags);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!oneTag) {
      res.status(404).json({message: 'Unable to find tag with this ID :-('});
      return;
    }

    res.status(200).json(oneTag);

  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    id: req.body.id ,
    tag_name: req.body.tag_name
  })
    .then(newTag => res.status(200).json(newTag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      id: req.body.id ,
      tag_name: req.body.tag_name
    },
    { 
      where: {
        id: req.params.id
      }
    })
    .then(() => res.status(200).json({message:"Tag updated successfully!" }))
    .catch( err => res.status(500).json(err))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.json({message: "Tag deleted!"});
    res.status(200)
  })
  .catch (err => {
    res.json(err);
    res.status(500)
  })
});

module.exports = router;
