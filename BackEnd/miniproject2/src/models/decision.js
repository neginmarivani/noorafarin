const mongoose = require('mongoose')

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

async function createDecision (analyst, analyst_decision, signal) {
  try{
    const decision = new Decision({
      analyst,
      analyst_decision,
      signal
    })
    const result = await decision.save()
    // console.log(result)
    return result
  }catch (err) {
    console.log('err' + err);
  }
}

async function listDecisions () {
  const decisions = await find().populate('signal', 'signal_status -_id')
  console.log(decisions)
}

module.exports = {
  Decision,
  createDecision,
  listDecisions 
}
