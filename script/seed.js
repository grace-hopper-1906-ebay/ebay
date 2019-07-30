'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  //users
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  console.log(`seeded ${users.length} users`)

  //products
  const products = await Promise.all([
    Product.create({
      name: 'Holly Wand',
      price: 199.99,
      description: 'Size: 11 inches\nWood: Holly\nCore: Phoenix Feather',
      image: 'https://bit.ly/2YxkVwK'
    }),
    Product.create({
      name: 'Vine Wand',
      price: 60.0,
      description: 'Size: 10 3/4 inches\nWood: Vine\nCore: Dragon Heartstring',
      image: 'https://bit.ly/2K33xM8'
    }),
    Product.create({
      name: 'Hornbeam Wand',
      price: 55.0,
      description:
        'Size: 10 1/4 inches\nWood: Hornbeam\nCore: Dragon Heartstring',
      image: 'https://bit.ly/2Mun1ej'
    }),
    Product.create({
      name: 'Hawthorn Wand',
      price: 80.0,
      description: 'Size: 10 inches\nWood: Hawthorn\nCore: Unicorn Hair',
      image: 'https://bit.ly/2LMpMZ7'
    }),
    Product.create({
      name: 'Ash Wand',
      price: 72.53,
      description: 'Size: 12 inches\nWood: Ash\nCore: Unicorn Hair',
      image: 'https://bit.ly/2ykepPh'
    }),
    Product.create({
      name: 'Willow Wand',
      price: 69.42,
      description: 'Size: 14 inches\nWood: Willow\nCore: Unicorn Hair',
      image: 'https://bit.ly/2K6PMfH'
    }),
    Product.create({
      name: 'Elder Wand',
      price: 1000.0,
      description: 'Size: 15 inches\nWood: Elder\nCore: Threstral Hair',
      image: 'https://bit.ly/2GPi4JF'
    }),
    Product.create({
      name: 'Cherry Wand',
      price: 30.0,
      description: 'Size: 13 inches\nWood: Cherry\nCore: Unicorn Hair',
      image: 'https://bit.ly/2SSqpRj'
    }),
    Product.create({
      name: 'Cypres Wand',
      price: 60.0,
      description: 'Size: 10 1/4 inches\nWood: Cypres\nCore: Unicorn Hair',
      image: 'https://bit.ly/2OvD0LQ'
    }),
    Product.create({
      name: 'Rosewood Wand',
      price: 152.37,
      description: 'Size: 9 1/2 inches\nWood: Rosewood\nCore: Veela Hair',
      image: 'https://bit.ly/2ZlebmJ'
    }),
    Product.create({
      name: 'Ash Wand',
      price: 60.0,
      description: 'Size: 12 1/4 inches\nWood: Ash\nCore: Unicorn Hair',
      image: 'https://bit.ly/2YwHYYu'
    }),
    Product.create({
      name: 'Yew Wand',
      price: 199.99,
      description: 'Size: 13 1/2 inches\nWood: Yew\nCore: Phoenix Feather',
      image: 'https://bit.ly/2YvREqk'
    }),
    Product.create({
      name: 'Walnut Wand',
      price: 110.0,
      description:
        'Size: 12 3/4 inches\nWood: Walnut\nCore: Dragon Heartstring',
      image: 'https://bit.ly/2LM8PxL'
    }),
    Product.create({
      name: 'Mahogany Wand',
      price: 48.72,
      description: 'Size: 11 inches\nWood: Mahogany\nCore: Dragon Heartstring',
      image: 'https://bit.ly/2Y9WOZA'
    }),
    Product.create({
      name: 'Cedar Wand',
      price: 9.99,
      description: 'Size: 10 1/4 inches\nWood: Cedar\nCore: Dragon Heartstring',
      image: 'https://bit.ly/2ZmqizS'
    }),
    Product.create({
      name: 'Yew Wand',
      price: 111.11,
      description: 'Size: 7 inches\nWood: Yew\nCore: Unicorn Hair',
      image: 'https://bit.ly/2LM8ISR'
    })
  ])
  console.log(`seeded ${products.length} products`)

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
