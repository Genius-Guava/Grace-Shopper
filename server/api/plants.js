const router = require('express').Router()
const {Plant} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const plant = await Plant.create(req.body)
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
    const plant = await Plant.findbyId(req.params.plantId)
    await plant.update(req.body)
    res.json(plant)
  } catch (err) {
    next(err)
  }
})
