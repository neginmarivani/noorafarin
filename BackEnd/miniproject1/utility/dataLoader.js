'use strict'
const ccxt = require('ccxt')
const dailyCandleDataSchema = require('../models/candleData')
const _ = require('underscore')

function addDays (startDate, days) {
  let date = new Date()
  date.setTime(startDate.getTime() + days * 24 * 60 * 60 * 1000)
  return date
}
function saveToDB (element) {
  const newDailyCandle = new dailyCandleDataSchema({
    Date: element[0],
    Open: Number(element[1]),
    High: Number(element[2]),
    Low: Number(element[3]),
    Close: Number(element[4]),
    Volume: Number(element[5])
  })
  newDailyCandle.save()
}

async function bitcoinDailyDataScrapper (maxDataRequired) {
  // scrappe daily bitcoin candle data since 2017

  const startDate = new Date(2017, 1, 1, 0, 0, 0)
  const BinanceExchange = new ccxt.binance()
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  if (BinanceExchange.has.fetchOHLCV) {

    await sleep(BinanceExchange.rateLimit) // milliseconds
    const firstDate = BinanceExchange.parse8601('2017-01-01T00:00:00')
    const btcDailyOhlcv = await BinanceExchange.fetchOHLCV(
      'BTC/USDT',
      '1d',
      firstDate,
      1000
    )
    _.map(btcDailyOhlcv, saveToDB)

    const secondDate = addDays(startDate, 1000)
    const formattedDate = BinanceExchange.parse8601(secondDate)
    const btcDailyOhlcvSecond = await BinanceExchange.fetchOHLCV(
      'BTC/USDT',
      '1d',
      formattedDate,
      1000
    )
    _.map(btcDailyOhlcvSecond, saveToDB)
  }
}

module.exports = {
  bitcoinDailyDataScrapper
}
