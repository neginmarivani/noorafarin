const mongoose = require('mongoose')
const databaseName = 'signal_decisions_db_test'

module.exports.setUp = async () => {
  const url = `mongodb://localhost:27017/${databaseName}`
  await mongoose.connect(url, { useNewUrlParser: true })
}

module.exports.dropDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
}

module.exports.dropCollections = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}
