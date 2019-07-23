// 引入相依套件與檔案
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// UI Message
const flash = require('connect-flash')
const session = require('express-session')

// 使用 express 與設定 port 為 3000
const app = express()
const port = 3000

// flash
app.use(flash())
// Session
app.use(session({
  secret: 'helloworld',
  resave: 'false',
  saveUninitialized: 'false'
}))

// 引入 Mongoose 與連結設定
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection

//  db 連線成功與錯誤處理
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定 template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')

  next()
})

// 設定路由
// home 路由
app.use(require('./routes'))

// 啟動伺服器
app.listen(process.env.PORT || 3000, () => {
  console.log(`Express is listening on localhost:${port}`)
})
