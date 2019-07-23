// 引入套件與檔案
const express = require('express')
const router = express.Router()

const shortCode = require('../controllers/uniqueUrlCode')

const URLShortener = require('../models/urlShortener')

const { validationResult } = require('express-validator')
const { urlShortenerFieldValidate } = require('../validate/validateField')

/********************************************************************
* 短網址頁面
* GET http://localhost:3000/
********************************************************************/

router.get('/', (req, res) => {
  res.render('index')
})

/********************************************************************
* 產生短網址
* GET http://localhost:3000/shortUrl
********************************************************************/

router.post('/shortUrl', urlShortenerFieldValidate, async (req, res) => {

  const originalUrl = shortCode.prependingHTTP(req.body.originalUrl)
  const validateFieldErrors = validationResult(req)

  if (!validateFieldErrors.isEmpty()) {
    let errorsMessage = []
    validateFieldErrors.array().forEach(item => {
      // console.log(item.msg)
      errorsMessage.push({ message: item.msg })
    })

    res.render('index', {
      errors: errorsMessage,
      originalUrl
    })

  } else {

    try {

      let urlData = await URLShortener.findOne({
        originalUrl
      }).exec()

      if (urlData) {
        urlData = urlData.shortId
      } else {
        urlData = null
      }

      if (urlData) {
        res.render('index', {
          shortUrl: shortUrl = `${req.protocol}://${req.headers.host}/${urlData}`,
          shortId: urlData,
          originalUrl
        })
      } else {

        const urlCode = await shortCode.createShortId()
        shortUrl = `${req.protocol}://${req.headers.host}/${urlCode}`

        const newUrlShorten = new URLShortener({
          originalUrl: originalUrl,
          shortId: urlCode,
          shortUrl: shortUrl,
          createdAt: new Date()
        })

        await newUrlShorten.save()
        res.render('index', {
          originalUrl,
          shortUrl,
          shortId: urlCode
        })

      }
    } catch (err) {
      let errorsMessage = []
      errorsMessage.push({ message: '無效的網址！請再次確定網址是否正確' })
      res.render('index', {
        errors: errorsMessage,
        originalUrl
      })
    }

  }

})

/********************************************************************
* 經由短網址到原始網站
* GET http://localhost:3000/:shortId
********************************************************************/

router.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId
  const originalUrl = await shortCode.useShortIdToGetOriginalURL(shortId)

  if (originalUrl) {
    return res.redirect(originalUrl)
  } else {
    const baseUrl = `${req.protocol}://${req.headers.host}/`
    res.render('404', {
      baseUrl
    })
  }
})

// 匯出模組
module.exports = router
