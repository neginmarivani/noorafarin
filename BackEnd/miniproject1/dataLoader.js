var ccxt = require ('ccxt')

const binance_exchange = new ccxt.binance()
binance_exchange.enableRateLimit = false // disable

async function bitcoin_daily_data_scrapper () {
    let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms));
    if (binance_exchange.has.fetchOHLCV) {
        // let bitcoin_symbol = binance_exchange.markets[] 
        await sleep (binance_exchange.rateLimit) // milliseconds
        const btc_daily_ohlcv = await binance_exchange.fetchOHLCV ('BTC/USDT', '1d')
        console.log(btc_daily_ohlcv)
        
    }
}

bitcoin_daily_data_scrapper()