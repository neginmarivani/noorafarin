const { buildSchema } = require('graphql')

module.exports = buildSchema(`

  type BTC {
    _id: ID!
    Date: String!
    Open: Float!
    High: Float!
    Low: Float!
    Close: Float!
    Volume: Int!
  }
  type Query {
    coins:[BTC!]
  }
  schema {
    query: Query
  }
`)
