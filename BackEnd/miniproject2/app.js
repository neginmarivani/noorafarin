const utility = require('./utility')
const mongoose = require('mongoose')

const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
  .connect('mongodb://localhost:27017/signals', options)
  .then(() => {
    console.log('database is connected successfully')
  })
  .catch(err => console.error('could not connect to MongoDB...', err))

utility.createSignal(1, 'target')
utility.createSignal(2, 'open')
utility.createSignal(3, 'stop')
utility.createSignal(4, 'target')
utility.createSignal(5, 'stop')
utility.createSignal(6, 'open')
utility.createSignal(7, 'target')

utility.createDecision('gholi', 'reject', '628234eaec717b7e1dc56b4e')
utility.createDecision('giti', 'confirm', '628268bf3053687b5f6ebd76')
utility.createDecision('reza', 'confirm', '628268bf3053687b5f6ebd73')
utility.createDecision('ebi', 'reject', '628268bf3053687b5f6ebd75')
utility.createDecision('ebi', 'reject', '628268bf3053687b5f6ebd76')
utility.createDecision('reza', 'confirm', '628268bf3053687b5f6ebd73')
utility.createDecision('gholi', 'reject', '628234eaec717b7e1dc56b4e')
utility.createDecision('gholi', 'reject', '6282ab0ab4b0ad556ae07331')
utility.createDecision('ebi', 'reject', '6282ab75b3280e29758983c1')
utility.createDecision('reza', 'confirm', '628234eaec717b7e1dc56b4e')

utility.miniproject2()
