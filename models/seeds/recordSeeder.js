if(process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}
const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  for(let i = 1 ; i <= 10 ; i++) {
    Record.create({
      name: `name-${i}`,
      date: `2022/12/15`,
      amount: i*10
    })
  }
  console.log('recordSeeder done');
  process.exit()
})