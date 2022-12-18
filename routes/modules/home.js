const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const isSelected = require('../../utilities/isSelected')

router.get('/', (req, res) => {
  Category.find()
  .lean()
  .then((categories) => {
    //新增預設「顯示全部」的選項（Category資料庫原本沒有），渲染category option用
    const defaultCategory = { _id: '0', name: '顯示所有類別', icon: '' }
    categories.unshift(defaultCategory)

    const userID = req.user._id //登入後收到
    const categoryID = req.query.categoryID //表單onchange送出（「顯示全部」的值為 undefinded or '0'）
    const optionHTML = isSelected('index', categories, categoryID) //輸出option的HTML

    //決定頁面顯示的record種類，渲染 records 用
    const filter = (!categoryID || categoryID === '0') ? { userID } : { userID, categoryID } //期望：{ categoryID: '639c8cc21f4b7bc84074e3a4' }
    Record.find(filter)
      .lean()
      .sort({ categoryID: 1 })
      .then(records => {
        let totalAmount = 0
        // 有兩種情況：1.顯示的是全部，會有不同category icon || 2. 顯示的是特定分類，都是同category icon
        // Object.keys(filter).length = 0 or 1 -> Boolean() = false(顯示全部) or true（特定分類）
        if( Boolean(Object.keys(filter)[1]) ) {
          // ======================== 顯示特定分類 ======================== //
          const category = categories.find((category) => { return String(category._id) === categoryID})
          records.forEach((record => {
            totalAmount += record.amount
            record.category = { name: category.name , icon: category.icon }
          }))
        }else {
          // ======================== 顯示全部 ======================== //
          records.forEach((record => {
            totalAmount += record.amount
            const category = categories.find((category) => { return String(category._id) === String(record.categoryID)})
            record.category = { name: category.name , icon: category.icon }
          }))
        }
        return res.render('index', { records, totalAmount, optionHTML })
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

module.exports = router