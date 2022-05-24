const mongoose = require('mongoose')
const decision = require('../src/models/decision')
const db = require('./setup/db')

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
 * Decision model
 */
describe('Decision model', () => {
  it('create & save Decision successfully', async () => {
    const savedDecision = await decision.createDecision(
      'dawod',
      'reject',
      '628bebbb553dc24c3f43d690'
    )
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedDecision._id).toBeDefined()
    expect(savedDecision.analyst).toBe('dawod')
    expect(savedDecision.analyst_decision).toBe('reject')
  })
})
