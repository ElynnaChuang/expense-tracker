if(process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const db = require('../../config/mongoose')

const bcrypt = require('bcryptjs')
const SEEDER_USER = {
  name: 'test',
  email: 'test@test.com',
  password: '12345678'
}

db.once('open', () => {
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEEDER_USER.password, salt))
    .then(hash => {
      // ============ 產生test使用者 ============ //
      const { name, email } = SEEDER_USER
      User.create({ name, email, password: hash})
        .then( user => {
          const userID = user._id
          Category.find()
            .lean()
            .then(categories => {
              return Promise.all(Array.from({ length: 10 },
              (_, i) => {
                const index = i%(categories.length) //0~4循環
                return Record.create({
                  name: `name-${i+1}`,
                  date: `2022-12-15`,
                  amount: (i+1)*10,
                  categoryID: categories[index]._id,
                  userID
                })
              }))
            })
            .then(() => {
              console.log('recordSeeder done');
              process.exit()
            })
        })
    })
    .catch(err => console.log('create recordSeeder error', err))
})