const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const CATEGORY = require('../../category.json').CATEGORY
const categories = Object.keys(CATEGORY).map(key => {
  return {'name': key, 'icon': CATEGORY[key]}
})

const isSelected = require('../../utilities/isSelected')


//---新增---//
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {

})

//---修改---//
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  Record.findOne({ _id })
  .lean()
  .then(record => {
    const { categoryID } = record
    Category.findById(categoryID)
      .then(category => {
          const optionHTML = isSelected(categories, category.name)
          res.render('edit', { record, optionHTML })
        })
    })
})

router.put('/:id', (req, res) => {
  const { name, date, amount, category } = req.body
  Category.findOne({ name: category })
    .then((category) => {
      const _id = req.params.id
      const categoryID = category._id
      Record.findOne({ _id })
        .then((record) => {
          if (!record) return res.render('error')
          record.name = name
          record.date = date
          record.amount = amount
          record.categoryID = categoryID
          return record.save()
        })
        .then(() => res.redirect('/'))
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

//---刪除---//
router.delete('/:id', (req, res) => {

})


module.exports = router