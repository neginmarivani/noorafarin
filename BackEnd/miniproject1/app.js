const express = require('express')
const graphqlHttp = require('express-graphql').graphqlHTTP
const mongoose = require('mongoose')
const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolvers')

const app = express() 

app.use (
  '/graphql',
  graphqlHttp ({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
)

const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect ('mongodb://localhost:27017/crypto_database' , options)
.then(()=> {
  console.log ('database is connected successfully') 
  app.listen (4000, () => console.log('Server is running on localhost:4000'))
})
.catch (err => console.error('could not connect to MongoDB...' , err))

