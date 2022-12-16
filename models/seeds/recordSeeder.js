if(process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}
const Record = require('../record')
const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.findOne({ name: '休閒娛樂' })
    .lean()
    .then(category => {
      const categoryID = category._id
      return Promise.all(Array.from(
        { length: 10 },
        (_, i) => Record.create({
          name: `name-${i+1}`,
          date: `2022-12-15`,
          amount: (i+1)*10,
          categoryID
        })
      ))
    })
    .then(() => {
      console.log('recordSeeder done');
      process.exit()
    })
    .catch(err => console.log('create recordSeeder error', err))
})