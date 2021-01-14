'use strict'

const db = require('../server/db')
const {User, Plant} = require('../server/db/models')

const seedPlants = [
  {
    name: 'Coffee Plant',
    imageUrl:
      'https://i.etsystatic.com/23071225/r/il/d3117a/2652141648/il_794xN.2652141648_qe9j.jpg',
    price: 30,
    description:
      'The same plant that grows your morning cup of coffee is also a low maintence house plant!',
    light: 'brightlight',
    petFriendly: false,
    quantity: 10
  },

  {
    name: 'Monstera Deliciosa',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0013/3529/6118/products/Wythe-30-2970.030-WH_Monstera-Deliciosa-10.jpg?v=1605963690',
    price: 55,
    description:
      'Also known as the "swiss cheese plant", this place is known for their odd-looking, perforated leaves with holes.',
    light: 'brightlight',
    petFriendly: false,
    quantity: 10
  },

  {
    name: 'ZZ Plant',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0350/5665/products/5N8A2459_web_600x600.jpg?v=1579563579',
    price: 35,
    description:
      'The plant is known for its thick, waxy green leaves. It tolerates low lights, making it a perfect plant for beginners!',
    light: 'lowlight',
    petFriendly: true,
    quantity: 10
  },

  {
    name: 'Norfolk Island Pine',
    imageUrl:
      'https://www.gardeningknowhow.com/wp-content/uploads/2020/11/araucaria-400x533.jpg',
    price: 40,
    description:
      'Similiar to the yearly Christmas tree,  but this plant can be kept all year around, giving your home a lively addition.',
    light: 'brightlight',
    petFriendly: false,
    quantity: 10
  },

  {
    name: 'Succulent Trio',
    imageUrl:
      'https://robertsonsflowers.imgix.net/images/itemVariation/succulenttrioinblairpots-200311113055.jpg',
    price: 30,
    description:
      'This trio is petite in size, making it a perfect addition for your home office or work office.',
    light: 'brightlight',
    petFriendly: false,
    quantity: 10
  },

  {
    name: 'Aglanema',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81RPaGhZUlL._AC_SL1500_.jpg',
    price: 60,
    description:
      'The plant is perfect to add a pop of color to your house while being low maintanence, making it perfect for someone who is a beginner!',
    light: 'brightlight',
    petFriendly: false,
    quantity: 10
  },

  {
    name: 'Pink Anthurium',
    imageUrl:
      'https://i.etsystatic.com/6201261/r/il/7892c0/2625969796/il_794xN.2625969796_kd4c.jpg',
    price: 55,
    description:
      "This plant is the known as the world's longest blooming houseplant. Each bloom lasts up to eight weeks!",
    light: 'brightlight',
    petFriendly: false,
    quantity: 10
  },

  {
    name: 'Money Tree Plant',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71vYvA467bL._AC_SL1500_.jpg',
    price: 35,
    description:
      'This plant is known to bring good luck and fortune in some culture while also adding a tropical feel to your home.',
    light: 'brightlight',
    petFriendly: true,
    quantity: 10
  },

  {
    name: 'Bird of Paradise',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0013/3529/6118/products/Wythe-40-2970.040-WH_Bird-of-Paradise-14.jpg?v=1604354745',
    price: 150,
    description:
      'As this is one of the most popular house plants, it is easy to care for while bringing a touch of tropics to your home with vibrant green leaves.',
    light: 'brightlight',
    petFriendly: false,
    quantity: 10
  },

  {
    name: 'Pilea Peperomioides',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0748/9875/products/image_be438475-1760-434c-89b4-606807422da1_1024x1024.jpg?v=1599761746',
    price: 40,
    description:
      'Also known as the Chinese money plant, this plant is known for their saucer-shaped, shiny, vibrant colored leaves.',
    light: 'lowlight',
    petFriendly: true,
    quantity: 10
  },

  {
    name: 'Calathea Makoyana',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0662/5489/products/Calathea_makoyana_-_Peacock_Calathea_-_pistils_nursery-2.jpg?v=1609194519',
    price: 25,
    description:
      'Also known as the Peacock plant, with great care, it can bring great colors to your home!',
    light: 'brightlight',
    petFriendly: false,
    quantity: 10
  },

  {
    name: 'Snake Plant Laurentii',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1780/8157/products/MotherInLaw_Laurentii_8e77bf27-3124-4bad-8029-e1d1c67ffe62_1200x1200.jpg?v=1556810161',
    price: 35,
    description:
      'This succulent plant is known for their upright swordlight leaves with a vibrant yellow edge that helps remove toxins on your home..',
    light: 'lowlight',
    petFriendly: true,
    quantity: 10
  }
]
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({username: 'cody', email: 'cody@email.com', password: '123'}),
    User.create({
      username: 'murphy',
      email: 'murphy@email.com',
      password: '123'
    })
  ])
  await Plant.bulkCreate(seedPlants)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
