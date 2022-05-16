const model = require('./models')
const _ = require('underscore')

async function createSignal (signal_number, signal_status) {
  const signal = new model.Signal({
    signal_number,
    signal_status
  })
  const result = await signal.save()
  console.log(result)
}

async function createDecision (analyst, analyst_decision, signal) {
  const decision = new model.Decision({
    analyst,
    analyst_decision,
    signal
  })
  const result = await decision.save()
  console.log(result)
}

async function listDecisions () {
  const decisions = await Decision.find().populate(
    'signal',
    'signal_status -_id'
  )
  console.log(decisions)
}

function count_element_occurance (array) {
  let a = [],
    b = [],
    arr = [...array],
    prev

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

async function miniproject2 () {
  const TPDecisions = await model.Decision.find(
    { analyst_decision: 'confirm' },
    'analyst'
  ).populate({ path: 'signal', match: { signal_status: 'target' } })
  const FNDecisions = await model.Decision.find(
    { analyst_decision: 'reject' },
    'analyst'
  ).populate({ path: 'signal', match: { signal_status: 'stop' } })
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
    const totalDes = await model.Decision.count({ analyst: analyst_name })

    const corDes = correct_analysts[1][iter]

    analyst_info.push({ name: analyst_name, score: corDes / totalDes })
    iter++
  }
  console.log(analyst_info.sort((a, b) => a.score - b.score))
}

module.exports = {
  listDecisions,
  createDecision,
  createSignal,
  miniproject2
}
