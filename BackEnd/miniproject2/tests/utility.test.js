const db = require('./setup/db')
const utility = require('../src/utility')

beforeAll(async () => {
  await db.setUp()
})

afterEach(async () => {
  await db.dropCollections()
})

afterAll(async () => {
  await db.dropDatabase()
})

describe('utility functions', () => {
  it('target signals', async () => {
    const response = await utility.targetSignalsId()
    response.forEach(el => {
      // check each element of the array, individually
      expect(el).toEqual(expect.objectContaining({ signalStatus: 'target' }))
    })
  })
  it('stop signals', async () => {
    const result = await utility.stopSignalsId()
    result.forEach(el => {
      expect(el).toEqual(expect.objectContaining({ signalStatus: 'stop' }))
    })
  })
  it('confirmed decision on target signal', async () => {
    const decisionsList = await utility.confirmedDecisionOnTargetSignal()
    decisionsList.forEach(el => {
      expect(el).toEqual(
        expect.objectContaining({ analystDecision: 'confirm' })
      )
    })
  })
  it('get analysts based On Score successfully', async () => {
    const expected = [
      { name: 'ebi', totalDecisions: 6, correctDecisions: 6, score: 1 },
      { name: 'giti', totalDecisions: 4, correctDecisions: 2, score: 0.5 },
      {
        name: 'reza',
        totalDecisions: 6,
        correctDecisions: 2,
        score: 0.3333333333333333
      }
    ]
    const analystInfo = await utility.getAnalystsBasedOnScore()
    analystInfo.forEach(el => {
      expect(expected).toContainEqual(
        expect.objectContaining({ name: el.name })
      )
    })
  })
})
