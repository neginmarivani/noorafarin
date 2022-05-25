const signal = require('./models/signal')
const decision = require('./models/decision')
const _ = require('underscore')

function countElementOccurance (array) {
  const a = []
  const b = []
  const arr = [...array]
  let prev

  arr.sort()
  for (const element of arr) {
    if (element !== prev) {
      a.push(element)
      b.push(1)
    } else ++b[b.length - 1]
    prev = element
  }
  return [a, b]
}

async function confirmedDecisionOnTargetSignal () {
  const targetSignalsIds = await targetSignalsId()
  return decision.Decision.find(
    {
      $and: [
        { analystDecision: 'confirm' },
        { signal: { $in: targetSignalsIds } }
      ]
    },
    'analyst'
  )
}
async function rejectedDecisionOnStopSignal () {
  const stopSignalsIds = await stopSignalsId()
  return decision.Decision.find(
    {
      $and: [{ analystDecision: 'reject' }, { signal: { $in: stopSignalsIds } }]
    },
    'analyst'
  )
}
function targetSignalsId () {
  return signal.Signal.find({ signalStatus: 'target' }, '_id')
}
function stopSignalsId () {
  return signal.Signal.find({ signalStatus: 'stop' }, '_id')
}

async function getAnalystsBasedOnScore () {
  const TPDecisions = await confirmedDecisionOnTargetSignal()
  const FNDecisions = await rejectedDecisionOnStopSignal()
  const correctDes = []
  const analystInfo = []
  _.map(FNDecisions, function (element) {
    correctDes.push(element.analyst)
  })
  _.map(TPDecisions, function (element) {
    correctDes.push(element.analyst)
  })

  const correctAnalysts = countElementOccurance(correctDes)

  let iter = 0
  for (const analystName of correctAnalysts[0]) {
    const totalDes = await decision.Decision.count({ analyst: analystName })
    const corDes = correctAnalysts[1][iter]
    analystInfo.push({
      name: analystName,
      totalDecisions: totalDes,
      correctDecisions: corDes,
      score: corDes / totalDes
    })
    iter++
  }
  analystInfo.sort((a, b) => b.score - a.score)
  console.log(analystInfo)
  return analystInfo
}

module.exports = {
  targetSignalsId,
  stopSignalsId,
  confirmedDecisionOnTargetSignal,
  rejectedDecisionOnStopSignal,
  getAnalystsBasedOnScore
}
