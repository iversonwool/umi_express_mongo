const dbURL = 'mongodb://127.0.0.1:27017/admin'

const mongoose = require('mongoose');

function init(successCallback, errorCallback) {
  mongoose.connect(dbURL)
  mongoose.connection.once('open', () => {
    if (successCallback) {
      successCallback()
    }
    
  })
  mongoose.connection.on('error', () => {
    console.log('connection error')
    if (errorCallback) {
      errorCallback()
    }
  })
  mongoose.connection.on('close', () => {
    console.log('connection close')
  })
}

module.exports = init
