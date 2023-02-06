if(process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const db = require('../../config/mongoose')

const bcrypt = require('bcryptjs')
const SEEDER_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

db.once('open', () => {
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEEDER_USER.password, salt))
    .then(hash => {
      // ============ 產生 User ============ //
      const { name, email } = SEEDER_USER
      return User.create({ name, email, password: hash})
      .catch(err => console.log('create User error', err))
    })
    .then( user => {
      const userID = user._id
      return Category.find().lean()
        .then(categories => {
          return Promise.all(Array.from({ length: 10 }, (_, i) => {
            const index = i%(categories.length) //0~4循環
            // ============ 產生 Record ============ //
            return Record.create({
              name: `name-${i+1}`,
              date: `2022-12-15`,
              amount: (i+1)*10,
              categoryID: categories[index]._id,
              userID
            })
            .catch(err => console.log('create Record error', err))
          }))
        })
        .catch(err => console.log('find Category error', err))
    })
    .then(() => {
      console.log('All done!');
      process.exit()
    })
    .catch(err => console.log('create recordSeeder error', err))
})