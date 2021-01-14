'use strict'
/* global describe it */
const {expect} = require('chai')
const seed = require('./seed')
const db = require('../server/db')
const Plant = db.model('plant')

describe('seed script', () => {
  it('completes successfully', seed)

  it('populates the database with at least ten plants', async () => {
    const seedPlants = await Plant.findAll()
    expect(seedPlants).to.have.lengthOf.at.least(10)
  })
})
