const signal = require('./models/signal')
const decision = require('./models/decision')
const utility = require('./utility')
const mongoose = require('mongoose')

const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
  .connect('mongodb://localhost:27017/signal_decisions_db', options)
  .then(() => {
    console.log('database is connected successfully')
  })
  .catch(err => console.error('could not connect to MongoDB...', err))

// signal.createSignal(2, 'open')
// signal.createSignal(3, 'stop')
// signal.createSignal(4, 'target')
// signal.createSignal(5, 'stop')
// signal.createSignal(6, 'open')
// signal.createSignal(7, 'target')

// decision.createDecision('giti', 'reject',"628bebbb553dc24c3f43d690")
// decision.createDecision('giti', 'confirm', "628bebbb553dc24c3f43d692")
// decision.createDecision('reza' , 'reject' ,   "628bebbb553dc24c3f43d692")
// decision.createDecision('reza', 'confirm', "628bebbb553dc24c3f43d692")
// decision.createDecision('reza','confirm',"628bebbb553dc24c3f43d68d")
// decision.createDecision('ebi', 'reject', "628bebbb553dc24c3f43d68e")
// decision.createDecision('ebi', 'reject', "628bebbb553dc24c3f43d692")
// decision.createDecision('ebi' , 'confirm',"628bebbb553dc24c3f43d692")

utility.getAnalystsBasedOnScore()

