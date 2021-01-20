'use strict'
/* global describe it */
const {expect} = require('chai')
const seed = require('../script/seed')
const db = require('../server/db')
const Plant = db.model('plant')
const Order = db.model('order')

describe('seed script', () => {
  it('completes successfully', seed)

  it('populates the database with at least ten plants', async () => {
    const seedPlants = await Plant.findAll()
    expect(seedPlants).to.have.lengthOf.at.least(10)
  })
  it('populates the database with at least one order in cart', async () => {
    const orders = await Order.findAll({where: {status: 'In Cart'}})
    expect(orders).to.have.lengthOf.at.least(1)
  })
})
