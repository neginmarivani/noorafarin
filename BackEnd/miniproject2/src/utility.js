const signal = require('./models/signal')
const decision = require('./models/decision')
const _ = require('underscore')

function count_element_occurance (array) {
  let a = []
  let b = []
  let arr = [...array]
  let prev

  arr.sort()
  for (let element of arr) {
    if (element !== prev) {
      a.push(element)
      b.push(1)
    } else ++b[b.length - 1]
    prev = element
  }

  return [a, b]
}

async function getAnalystsBasedOnScore () {
  
  targetSignals_ids = await signal.Signal.find({ signal_status: 'target' },'_id')
  stopSignals_ids = await signal.Signal.find({ signal_status: 'stop' }, '_id')

  const TPDecisions = await decision.Decision.find(
    {
      $and: [
        { analyst_decision: 'confirm' },
        // { signal: { $in: targetSignals_ids } }
      ]
    },
    'analyst'
  )
  const FNDecisions = await decision.Decision.find(
    {
      $and: [
        { analyst_decision: 'reject' },
        // { signal: { $in: stopSignals_ids } }
      ]
    },
    'analyst'
  )
  let correctDes = []
  let analyst_info = []

  _.map(FNDecisions, function (element) {
    correctDes.push(element.analyst)
  })
  _.map(TPDecisions, function (element) {
    correctDes.push(element.analyst)
  })

  correct_analysts = count_element_occurance(correctDes)

  let iter = 0
  for (const analyst_name of correct_analysts[0]) {
    const totalDes = await decision.Decision.count({ analyst: analyst_name })
    const corDes = correct_analysts[1][iter]
    analyst_info.push({
      name: analyst_name,
      total_decisions: totalDes,
      correct_decisions: corDes,
      score: corDes / totalDes
    })
    iter++
  }
  console.log(analyst_info.sort((a, b) => b.score - a.score))
}

module.exports = {
  getAnalystsBasedOnScore
}
