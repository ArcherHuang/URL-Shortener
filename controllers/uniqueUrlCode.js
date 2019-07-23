const URLShortener = require('../models/urlShortener')

module.exports = {

  /********************************************************************
  * 產出短網址 ( 產生 5 位數的英數字字串 )
  ********************************************************************/

  createShortId: async () => {

    do {
      let shortId = Math.random().toString(36).substr(2, 5)
      const isExitShortId = await URLShortener.findOne({
        shortId
      }).exec()
      if (isExitShortId) {
        shortId = ''
      } else {
        return shortId
      }
    } while (shortId)

  },

  /********************************************************************
  * 傳入短網址，回傳相對應的原始網址
  ********************************************************************/

  useShortIdToGetOriginalURL: async shortId => {
    const urlShorten = await URLShortener.findOne({
      shortId
    }).exec()
    if (urlShorten) {
      return urlShorten.originalUrl
    } else {
      return null
    }
  },

  /********************************************************************
  * 判斷前面是否有 http://，如沒有的話則加上
  ********************************************************************/

  prependingHTTP: oriUrl => {
    const withHttp = url => !/^https?:\/\//i.test(url) ? `http://${url}` : url
    return withHttp(oriUrl)
  }

}

