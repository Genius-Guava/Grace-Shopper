'use strict'

const db = require('../server/db')
const {User, Plant, Order, LineItem} = require('../server/db/models')

const seedPlants = [
  {
    name: 'Coffee Plant',
    imageUrl:
      'https://i.etsystatic.com/23071225/r/il/d3117a/2652141648/il_794xN.2652141648_qe9j.jpg',
    price: 30,
    description:
      'The same plant that grows your morning cup of coffee is also a low maintence house plant!',
    light: 'Low to Partial',
    quantity: 10
  },

  {
    name: 'Monstera Deliciosa',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0013/3529/6118/products/Wythe-30-2970.030-WH_Monstera-Deliciosa-10.jpg?v=1605963690',
    price: 55,
    description:
      'Also known as the "swiss cheese plant", this place is known for their odd-looking, perforated leaves with holes.',
    light: 'Bright',
    quantity: 10
  },

  {
    name: 'ZZ Plant',
    imageUrl:
      'https://asset.bloomnation.com/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto/v1605483210/vendor/3940/catalog/product/2/0/20180715064848_file_5b4b9710a462c.jpg',
    price: 35,
    description:
      'The plant is known for its thick, waxy green leaves. It tolerates low lights, making it a perfect plant for beginners!',
    light: 'Low to Partial',
    quantity: 10
  },

  {
    name: 'Norfolk Island Pine',
    imageUrl:
      'https://www.gardeningknowhow.com/wp-content/uploads/2020/11/araucaria-400x533.jpg',
    price: 40,
    description:
      'Similiar to the yearly Christmas tree,  but this plant can be kept all year around, giving your home a lively addition.',
    light: 'Bright',
    quantity: 10
  },

  {
    name: 'Succulent Trio',
    imageUrl:
      'https://robertsonsflowers.imgix.net/images/itemVariation/succulenttrioinblairpots-200311113055.jpg',
    price: 30,
    description:
      'This trio is petite in size, making it a perfect addition for your home office or work office.',
    light: 'Bright',
    quantity: 10
  },

  {
    name: 'Aglanema',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81RPaGhZUlL._AC_SL1500_.jpg',
    price: 60,
    description:
      'The plant is perfect to add a pop of color to your house while being low maintanence, making it perfect for someone who is a beginner!',
    light: 'Bright',
    quantity: 10
  },

  {
    name: 'Pink Anthurium',
    imageUrl:
      'https://i.etsystatic.com/6201261/r/il/7892c0/2625969796/il_794xN.2625969796_kd4c.jpg',
    price: 55,
    description:
      "This plant is the known as the world's longest blooming houseplant. Each bloom lasts up to eight weeks!",
    light: 'Bright',
    quantity: 10
  },

  {
    name: 'Money Tree Plant',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71vYvA467bL._AC_SL1500_.jpg',
    price: 35,
    description:
      'This plant is known to bring good luck and fortune in some culture while also adding a tropical feel to your home.',
    light: 'Bright',
    quantity: 10
  },

  {
    name: 'Bird of Paradise',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0013/3529/6118/products/Wythe-40-2970.040-WH_Bird-of-Paradise-14.jpg?v=1604354745',
    price: 150,
    description:
      'As this is one of the most popular house plants, it is easy to care for while bringing a touch of tropics to your home with vibrant green leaves.',
    light: 'Bright',
    quantity: 10
  },

  {
    name: 'Pilea Peperomioides',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0748/9875/products/image_be438475-1760-434c-89b4-606807422da1_1024x1024.jpg?v=1599761746',
    price: 40,
    description:
      'Also known as the Chinese money plant, this plant is known for their saucer-shaped, shiny, vibrant colored leaves.',
    light: 'Low to Partial',
    quantity: 10
  },

  {
    name: 'Calathea Makoyana',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0662/5489/products/Calathea_makoyana_-_Peacock_Calathea_-_pistils_nursery-2.jpg?v=1609194519',
    price: 25,
    description:
      'Also known as the Peacock plant, with great care, it can bring great colors to your home!',
    light: 'Low to Partial',
    quantity: 10
  },
  {
    name: 'Snake Plant Laurentii',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1780/8157/products/MotherInLaw_Laurentii_8e77bf27-3124-4bad-8029-e1d1c67ffe62_1200x1200.jpg?v=1556810161',
    price: 35,
    description:
      'This succulent plant is known for their upright swordlight leaves with a vibrant yellow edge that helps remove toxins on your home.',
    light: 'Bright',
    quantity: 10
  },
  {
    name: 'Dracaena Tikki Cane',
    imageUrl:
      'https://www.gardeningknowhow.com/wp-content/uploads/2012/07/dracaena-1.jpg',
    price: 85,
    description:
      'This plant will add a unique dimension to your home with their line green leaves with deep green borders on a tall cane. As an undemanding plant, tolerating low light, low humidity, it the pefect beginner plant!',
    light: 'Low to Partial',
    quantity: 10
  },
  {
    name: 'Philodendron Hope Selloum',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0013/3529/6118/products/Milton-41-4534.041-WH_Philodendron-Hope-Selloum-10.jpg?v=1605964585',
    price: 125,
    description:
      'Their impressively large, beautiful, heart shaped leaves can make a huge impact in your home while being a low-maintenance houseplant.',
    light: 'Low to Partial',
    quantity: 10
  },
  {
    name: 'Sansevieria Sayuri',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/5ce4a9e030d27d0001b78bd9/1585963453378-KIL1KQGV5NE0MFUS7531/ke17ZwdGBToddI8pDm48kGTWJab0oHe8Hq4_EYKStO17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmHHRMqniMJbuwH8EZRFFu5ajMTxjd48lOrENAw5Q_dktD51NFyIuef8SCbM9Yotkn/8365%2BSansevieria%2BSayuri.jpg?format=2500w',
    price: 100,
    description:
      'Though it is known for its adaptability to a wide range of conditions, this plant has an interesting color to it with its sword-like leaves that are silvery gray to a light green in color. ',
    light: 'Low to Partial',
    quantity: 10
  },
  {
    name: `Bird's Nest Fern`,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0013/3529/6118/products/Terracotta-Pot-6_Birdsnest-Fern-Victoria-6.jpg?v=1557436706',
    price: 40,
    description:
      'Known for its tropical fronds that grow out of a central rosette, this plant makes for the perfect tropical houseplant!',
    light: 'Bright',
    quantity: 10
  },
  {
    name: `Ponytail Palm`,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1706/1307/products/Beaucarnea-Pony-Tail-Palm-Single-Stem-Sita-Plant-Pot-Sand_67616f3f-4a20-47b9-8306-36494a55a61b_2000x.jpg?v=1569130111',
    price: 55,
    description:
      "This hardy houseplant is not only a popular pet friendly plant but is also known for it's water-storing trunk and curly leaves that grow like a pony tail.",
    light: 'Bright',
    quantity: 10
  },
  {
    name: `Silver Pathos`,
    imageUrl:
      'https://olivehill.net/wp-content/uploads/2015/08/04PothosSilverSplash-800x800.jpg',
    price: 25,
    description:
      'This plant has beautiful, heart-shaped, blue-green leaves with silver gray markings that grows fuller and less vining, making it a perfect hanging plant.',
    light: 'Low to Partial',
    quantity: 10
  }
]

const seedOrders = [
  {
    status: 'In Cart',
    userId: 1
  },
  {
    status: 'In Cart',
    userId: 2
  },
  {
    status: 'Past',
    userId: 1
  },
  {
    status: 'Past',
    userId: 3
  }
]

const seedLineItems = [
  {
    plantId: 1,
    orderId: 1
  },
  {
    plantId: 2,
    orderId: 1,
    quantity: 2
  },
  {
    plantId: 3,
    orderId: 1
  },
  {
    plantId: 5,
    orderId: 3
  },
  {
    plantId: 10,
    orderId: 2
  },
  {
    plantId: 7,
    orderId: 4
  }
]
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      email: 'bob@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      email: 'sally@email.com',
      password: '123'
    })
  ])

  await Promise.all(
    seedPlants.map(plant => {
      return Plant.create(plant)
    })
  )
  await Promise.all(
    seedOrders.map(order => {
      return Order.create(order)
    })
  )
  await Promise.all(
    seedLineItems.map(lineItem => {
      return LineItem.create(lineItem)
    })
  )
  // await Plant.bulkCreate(seedPlants)

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
