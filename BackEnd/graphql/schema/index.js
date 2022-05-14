const { buildSchema } = require("graphql")

module.exports = buildSchema(`

  type Coin {
    _id: ID!
    Date : Date!
    Open : Float!
    High : Float!
    Low : Float!
    Close : Float!
    Volume :Int!
  }

  type Query {
    coins:[Coin!]
  }

  schema {
    query: Query
  }
`)