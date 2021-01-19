const {expect} = require('chai')
const db = require('../index')
const Plant = db.model('plant')

describe('Plant model', () => {
  let plant
  before(() => db.sync({force: true}))
  beforeEach(() => {
    plant = {
      name: 'Beautiful Tree',
      price: 35,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      light: 'Bright',
      quantity: 5
    }
  })
  afterEach(() => db.sync({force: true}))
  it('has fields name, imageUrl, price, description, light, quantity', async () => {
    plant.notARealAttribute = 'does not compute'
    const savedPlant = await Plant.create(plant)
    expect(savedPlant.name).to.equal('Beautiful Tree')
    expect(savedPlant.price).to.equal('35.00')
    expect(savedPlant.description).to.equal(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    )
    expect(savedPlant.light).to.equal('Bright')
    expect(savedPlant.quantity).to.equal(5)
    expect(savedPlant.notARealAttribute).to.equal(undefined)
  })
  it('has a default imageUrl', async () => {
    const savedPlant = await Plant.create(plant)
    expect(savedPlant.imageUrl).to.equal(
      'https://images-na.ssl-images-amazon.com/images/I/41kT5IhNiwL.jpg'
    )
  })
  it('name cannot be null', async () => {
    const blankPlant = Plant.build()
    try {
      await blankPlant.validate()
      throw Error('validiation should have failed without a title')
    } catch (err) {
      expect(err.message).to.contain('name cannot be null')
    }
  })
})
