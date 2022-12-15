//---express 環境---//
const express = require('express')
const app = express()

if(process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}
const port = process.env.PORT
const routes = require('./routes')
require('./config/mongoose')

//---套件---//
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

//---middleware---//
app.use(express.urlencoded({ extended: true }))//解析POST傳入
app.use(methodOverride('_method'))//覆蓋method：get->put get->delete
app.use(express.static('public'))

//---routes---//
app.use(routes)

//---監聽路由---//
app.listen(port, () => {
  console.log(`Account Book is running on http://localhost:${port}`);
})