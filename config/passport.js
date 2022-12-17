const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

const bcrypt = require('bcryptjs')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        //email尚未註冊
        if(!user) return done(null, false)
        bcrypt.compare( password, user.password )
          .then((isMatched) => {
            //密碼錯誤
            if(!isMatched) return done(null, false)

            //成功登入
            return done(null, user)
          })
      })
      .catch(err => { return done(err, false) })
  }))

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, false))
  })
}