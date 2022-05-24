const { buildSchema } = require('graphql')

module.exports = buildSchema(`

  type dailyCandle {
    _id: ID!
    Date: String!
    Open: Float!
    High: Float!
    Low: Float!
    Close: Float!
    Volume: Int!
  }
  type Query {
    dailyCandleData:[dailyCandle!]
  }
  schema {
    query: Query
  }
`)
