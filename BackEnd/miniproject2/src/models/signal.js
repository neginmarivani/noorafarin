const mongoose = require('mongoose')

const Signal = mongoose.model(
  'Signal',
  new mongoose.Schema({
    signal_number: {
      type: Number,
      required: true
    },
    signal_status: {
      type: String,
      required: true,
      default: 'open',
      enum: ['open', 'target', 'stop']
    }
  })
)

async function createSignal (signal_number, signal_status) {
  try {
    const signal = new Signal({
      signal_number,
      signal_status
    })
    const result = await signal.save()
    // console.log(result)
    return result
  } catch (err) {
    console.log('err' + err);
  }
}
module.exports = {
  Signal,
  createSignal
}
