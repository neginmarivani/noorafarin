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

const Decision = mongoose.model(
  'Decision',
  new mongoose.Schema({
    analyst: {
      type: String,
      required: true
    },
    analyst_decision: {
      type: String,
      required: true,
      enum: ['confirm', 'reject']
    },
    signal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Signal'
    }
  })
)

module.exports = {
  Decision,
  Signal
}
