const mongoose = require('mongoose')

const Decision = mongoose.model(
  'Decision',
  new mongoose.Schema({
    analyst: {
      type: String,
      required: true
    },
    analystDecision: {
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

async function createDecision (analyst, analystDecision, signal) {
  try {
    const decision = new Decision({
      analyst,
      analystDecision,
      signal
    })
    const result = await decision.save()
    // console.log(result)
    return result
  } catch (err) {
    console.log('err' + err)
  }
}

async function listDecisions () {
  const decisions = await Decision.find().populate('signal', 'signalStatus -_id')
  console.log(decisions)
}

module.exports = {
  Decision,
  createDecision,
  listDecisions
}
