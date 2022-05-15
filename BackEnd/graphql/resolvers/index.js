const Bitcoin = require("../../models/coin")

module.exports = {
  coins: async () => {
    try {
      const coinsFetched = await Bitcoin.find()
      return coinsFetched.map(coin => {
        return {
            _id: coin._id,
            Date : coin.Date ,
            Open :coin.Open ,
            High : coin.High ,
            Low : coin.Low ,
            Close : coin.Close,
            Volume : coin.Volume
        }
      })
    } catch (error) {
      throw error
    }
  }
}
