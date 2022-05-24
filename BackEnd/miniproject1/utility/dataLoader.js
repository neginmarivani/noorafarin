'use strict'
var ccxt = require('ccxt')
const dailyCandleDataSchema = require('../models/candleData')
const _ = require('underscore')

async function bitcoin_daily_data_scrapper () {
  //scrappe daily bitcoin candle data since 2017
  const binance_exchange = new ccxt.binance()
  let sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  if (binance_exchange.has.fetchOHLCV) {
    await sleep(binance_exchange.rateLimit) // milliseconds
    const from_date = binance_exchange.parse8601('2017-01-01T00:00:00')
    const btc_daily_ohlcv = await binance_exchange.fetchOHLCV(
      'BTC/USDT',
      '1d',
      from_date
    )

    // save the data in dailyCandleDataSchema
    _.map(btc_daily_ohlcv, function (element) {
      const new_daily_candle = new dailyCandleDataSchema({
        Date: element[0],
        Open: Number(element[1]),
        High: Number(element[2]),
        Low: Number(element[3]),
        Close: Number(element[4]),
        Volume: Number(element[5])
      })
      new_daily_candle.save()
    })
  }
}

module.exports = {
  bitcoin_daily_data_scrapper
}
