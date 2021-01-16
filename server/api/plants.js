const router = require('express').Router()
const {Plant} = require('../db/models')
const {isAdmin} = require('./security')
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
    const plant = await Plant.findByPk(req.params.plantId)
    res.json(plant)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
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

router.delete('/:plantId', isAdmin, async (req, res, next) => {
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

router.put('/:plantId', isAdmin, async (req, res, next) => {
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
