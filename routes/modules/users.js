const express = require('express')
const router = express.Router()

const User = require('../../models/user')

const bcrypt = require('bcryptjs')

//---登入---//
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

//---登出---//
router.post('/logout', (req, res) => {

})

//---註冊---//
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const register_err_msg = []
  //得到為空 -> 返回註冊頁
  if( !name || !email || !password || !confirmPassword ) register_err_msg.push('輸入格不得為空')

  //密碼與確認密碼不同 -> 返回註冊頁
  if( password !== confirmPassword ) register_err_msg.push('密碼與確認密碼不同')

  User.find({ email })
    .then((user) => {
      //email已註冊過 -> 返回註冊頁
      if(user.length) register_err_msg.push('email已註冊過')
      if(register_err_msg.length) return res.render('register', { name, email })

      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
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

module.exports = router