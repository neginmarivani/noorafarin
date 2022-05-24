const dailyCandleDataSchema = require('../../models/candleData')

module.exports = {
  dailyCandleData: async () => {
    const dataFetched = await dailyCandleDataSchema.find()
    return dataFetched.map(coin => {
      return {
        _id: coin._id,
        Date: coin.Date,
        Open: coin.Open,
        High: coin.High,
        Low: coin.Low,
        Close: coin.Close,
        Volume: coin.Volume
      }
    })
  }
}
