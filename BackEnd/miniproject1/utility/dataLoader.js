'use strict'
const ccxt = require('ccxt')
const dailyCandleDataSchema = require('../models/candleData')
const _ = require('underscore')

async function bitcoinDailyDataScrapper () {
  // scrappe daily bitcoin candle data since 2017
  const BinanceExchange = new ccxt.binance()
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  if (BinanceExchange.has.fetchOHLCV) {
    await sleep(BinanceExchange.rateLimit) // milliseconds
    const fromDate = BinanceExchange.parse8601('2017-01-01T00:00:00')
    const btcDailyOhlcv = await BinanceExchange.fetchOHLCV(
      'BTC/USDT',
      '1d',
      fromDate
    )

    // save the data in dailyCandleDataSchema
    _.map(btcDailyOhlcv, function (element) {
      const newDailyCandle = new dailyCandleDataSchema({
        Date: element[0],
        Open: Number(element[1]),
        High: Number(element[2]),
        Low: Number(element[3]),
        Close: Number(element[4]),
        Volume: Number(element[5])
      })
      newDailyCandle.save()
    })
  }
}

module.exports = {
  bitcoinDailyDataScrapper
}
