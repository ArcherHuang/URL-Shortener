// 載入 express
const express = require('express')
const router = express.Router()

// 短網址
router.use('/', require('./home'))

// 匯出模組
module.exports = router