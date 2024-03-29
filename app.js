//---express 環境---//
const express = require('express')
const app = express()

if(process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}
const port = process.env.PORT || 3000
const routes = require('./routes')
require('./config/mongoose')
const usePassport = require('./config/passport')

//---套件---//
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

//---middleware---//
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))//解析POST傳入
app.use(methodOverride('_method'))//覆蓋method：get->put get->delete
app.use(express.static('public'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  // 紀錄登入狀態
  res.locals.isAuthenticated = req.isAuthenticated()// 回傳值是布林
  res.locals.user = req.user

  //使用flash，處裡登入、登出、註冊 的提示訊息
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error_msg')

  next()
})

//---routes---//
app.use(routes)

//---監聽路由---//
app.listen(port, () => {
  console.log(`Account Book is running on http://localhost:${port}`);
})