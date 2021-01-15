const router = require('express').Router()
const {Plant} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll()
    res.json(plants)
  } catch (err) {
    next(err)
  }
})

router.get('/:plantId', async (req, res, next) => {
  try {
    const plant = findByPk(req.params.plantId)
    res.json(plant)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      imageUrl,
      price,
      description,
      light,
      petFriendly,
      quantity
    } = req.body
    const plant = await Plant.create({
      name,
      imageUrl,
      price,
      description,
      light,
      petFriendly,
      quantity
    })
    res.json(plant)
  } catch (err) {
    next(err)
  }
})

router.delete('/:plantId', async (req, res, next) => {
  try {
    await Plant.destroy({
      where: {
        id: req.params.plantId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/:plantId', async (req, res, next) => {
  try {
    const {
      name,
      imageUrl,
      price,
      description,
      light,
      petFriendly,
      quantity
    } = req.body
    const plant = await Plant.findByPk(req.params.plantId)
    await plant.update({
      name,
      imageUrl,
      price,
      description,
      light,
      petFriendly,
      quantity
    })
    res.json(plant)
  } catch (err) {
    next(err)
  }
})
