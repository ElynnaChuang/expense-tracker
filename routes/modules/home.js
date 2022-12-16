const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  Record.find({})
    .lean()
    .sort({ date: 1 })
    .then(records => {
      return Promise.all(Array.from(
        { length: records.length },
        (_, i) => {
        const { categoryID } = records[i]
        return Category.findById( categoryID )
          .then(category => records[i].category = { name: category.name, icon: category.icon })
      }))
      .then(() => res.render('index', { records }))
      .catch(err => {
        console.log(err)
        res.render('error', { err })
      })
    })
    .catch(err => {
      console.log(err)
      res.render('error', { err })
    })
})

module.exports = router