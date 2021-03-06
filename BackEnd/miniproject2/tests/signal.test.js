const signal = require('../src/models/signal')
const db = require('./setup/db')

const signalData = {
  signalNumber: 10,
  signalStatus: 'open'
}
beforeAll(async () => {
  await db.setUp()
})
afterEach(async () => {
  await db.dropCollections()
})
afterAll(async () => {
  await db.dropDatabase()
})
/**
 * Signal model
 */
describe('Signal model', () => {
  it('create & save signal successfully', async () => {
    const savedSignal = await signal.createSignal(11, 'target')
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedSignal._id).toBeDefined()
    expect(savedSignal.signalNumber).toBe(11)
    expect(savedSignal.signalStatus).toBe('target')
  })
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('insert Signal successfully, but the field not defined in schema should be undefined', async () => {
    const SignalWithInvalidField = new signal.Signal({
      ...signalData,
      signalName: 'Handy one'
    })
    const savedSignalWithInvalidField = await SignalWithInvalidField.save()
    expect(savedSignalWithInvalidField._id).toBeDefined()
    expect(savedSignalWithInvalidField.signalName).toBeUndefined()
  })
})
