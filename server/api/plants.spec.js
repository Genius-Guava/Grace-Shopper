const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Plant = db.model('plant')

describe('Plants routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const plant1Name = 'White Orchid'
    const plant2Name = 'Purple Orchid'
    beforeEach(() => {
      return Plant.bulkCreate([
        {
          name: plant1Name
        },
        {name: plant2Name}
      ])
    })

    it('GET /api/plants', async () => {
      const res = await request(app)
        .get('/api/plants')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
      expect(res.body[0].name).to.be.equal(plant1Name)
      expect(res.body[1].name).to.be.equal(plant2Name)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
