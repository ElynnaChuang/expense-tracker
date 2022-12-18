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
  res.render('new', { categories })
})

router.post('/', (req, res) => {
  const userID = req.user._id //登入後收到
  const { name, date, amount, category } = req.body
  Category.findOne({ name: category })
    .then((category) => {
      const categoryID = category._id
      Record.create({ name, date, amount, categoryID, userID})
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

//---修改---//
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userID = req.user._id //登入後收到
  Record.findOne({ _id, userID })
    .lean()
    .then(record => {
      const { categoryID } = record
      Category.findById(categoryID)
        .then(category => {
          const optionHTML = isSelected('edit', categories, category.name)
          res.render('edit', { record, optionHTML })
        })
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

router.put('/:id', (req, res) => {
  const { name, date, amount, category } = req.body
  Category.findOne({ name: category })
    .then((category) => {
      const userID = req.user._id //登入後收到
      const _id = req.params.id
      const categoryID = category._id
      Record.findOne({ _id, userID })
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
  const userID = req.user._id //登入後收到
  const _id = req.params.id
  return Record.findOne({ _id, userID })
    .then(record => {
      if (!record) return res.render('error')
      record.remove()
    })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('error', { err })
    })
})


module.exports = router