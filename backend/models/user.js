const mongoose = require('mongoose')


let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  sex: {
    type: String,
    enum: ['male', 'female'],
  },
})

let UserModel = mongoose.model('user', userSchema)
// UserModel.create({name: 'LeeHow', age: 12, sex: 'male'})
//   .then(data => {console.log('created successfully', data)})
//   .catch(err => {console.log(err)})

// UserModel.deleteOne({id: '66014cd41ff5a7baa4d0b45f'})
//   .then(data => {console.log('deleted successfully', data)})
//   .catch(err => {console.log(err)})

// UserModel.updateOne({_id: '660cccd4e805127877567f34'}, {name: 'Lucy'})
//   .then(data => {console.log('updated successfully', data)})
//   .catch(err => {console.log(err)})


module.exports = UserModel
