const { check } = require('express-validator')
const shortCode = require('../controllers/uniqueUrlCode')

let urlShortenerFieldValidate = [
  check('originalUrl')
    .trim()
    .isLength({ min: 1 })
    .withMessage("請在 URL 欄位輸入資料")
    .isURL()
    .withMessage("請確認網址是否正確")
    .custom((value, { req }) => {
      try {
        value = shortCode.prependingHTTP(value)
        originalUrl = new URL(value)
        return true
      } catch (err) {
        throw new Error('不合法的網址')
      }
    })
]

module.exports = { urlShortenerFieldValidate }