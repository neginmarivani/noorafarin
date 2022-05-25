const mongoose = require('mongoose')

const Signal = mongoose.model(
  'Signal',
  new mongoose.Schema({
    signalNumber: {
      type: Number,
      required: true
    },
    signalStatus: {
      type: String,
      required: true,
      default: 'open',
      enum: ['open', 'target', 'stop']
    }
  })
)

async function createSignal (signalNumber, signalStatus) {
  try {
    const signal = new Signal({
      signalNumber,
      signalStatus
    })
    const result = await signal.save()
    console.log(result)
    return result
  } catch (err) {
    console.log('err' + err)
  }
}
module.exports = {
  Signal,
  createSignal
}
