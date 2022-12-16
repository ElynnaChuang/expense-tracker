if(process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}
const CATEGORY = require('../../category.json').CATEGORY
const Category = require('../category')
const db = require('../../config/mongoose')

const categories = Object.keys(CATEGORY).map(key => {
  return {'name': key, 'icon': CATEGORY[key]}
})

db.once('open', () => {
  return Promise.all(Array.from(
    { length: categories.length },
    (v, i) => {
      const { name, icon } = categories[i]
      return Category.create({ name, icon })
    }
  ))
  .then(() => {
    console.log('categorySeeder done');
    return process.exit()
  })
})
