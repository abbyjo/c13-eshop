const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCats = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(allCats);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCat = await Category.findByPk(req.params.id, {
      include: [{ model:Product }]
    });

    if (!oneCat) {
      res.status(404).json({message: 'Unable to find category with this ID :-('});
      return;
    }

    res.status(200).json(oneCat);

  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id ,
    category_name: req.body.category_name
  })
    .then(newCategory => res.status(200).json(newCategory))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      id: req.body.id ,
      category_name: req.body.category_name
    },
    { 
      where: {
        id: req.params.id
      }
    })
    .then(() => res.status(200).json({message: "Category updated successfully!"}))
    .catch( err => res.status(500).json(err))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.json({message: "Product deleted!"});;
    res.status(200)
  })
  .catch (err => {
    res.json(err);
    res.status(500)
  })
});

module.exports = router;
