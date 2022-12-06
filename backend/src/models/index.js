const mongoose = require('mongoose')
const connect = mongoose.connect(
  `${(process.env.MONGODB || 'mongodb://localhost:27017/mydb')}_${process.env.NODE_ENV || 'development'}`,
  {
    serverSelectionTimeoutMS: (!process.env.NODE_ENV) ? 1000 : 30000
  }
)

exports.Post = require('./posts.js')
exports.Comments = require('./comments.js')
exports.Profile = require('./profile.js')
exports.User = require('./user.js')

mongoose.connection.on('error', () => {
  console.error('Mongo not connected')
})
mongoose.connection.on('connected', () => {
  console.info('Mongo connected')
})
mongoose.connection.on('disconnected', () => {
  console.error('Mongo disconnected')
})

exports.Connection = connect
