var express = require('express');
var router = express.Router();

const UserModel = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // UserModel.find().count
  UserModel
    .find()
    .skip(0)
    .limit(10)
    // .countDocuments()
    .exec()
    .then(data => {
      console.log(data);
      res.send({success: true,total: data.length,data})
    })
    .catch(err => {res.status(500).send('server error', err)})
});


router.post('/create', function(req, res, next) {
  console.log('req.body', req.body)
  const {name, age, sex} = req.body
  if (!name) {
    res.send({code : -1, message: 'name is required'})
    return
  }
  if (sex !== 'male' && sex !== 'female') {
    res.send({code : -1, message: 'invalid gender'})
    return
  }
  UserModel
    .create({name, age, sex})
    .then(() => {
      res.send({code : 0, message: 'create success!'})
    })
    .catch(() => {
      res.status(500).send('server error')
    })
})

router.post('/update', function(req, res, next) {
  const {name, age, sex, _id} = req.body
  if (!_id) {
    res.send({code: -1, message: 'id required'})
    return
  }
  if (!name) {
    res.send({code : -1, message: 'name is required'})
    return
  }
  if (sex !== 'male' && sex !== 'female') {
    res.send({code : -1, message: 'invalid gender'})
    return
  }
  UserModel
    .updateOne({_id},{name, age, sex})
    .then(() => {
      res.send({code : 0, message: 'update success!'})
    })
    .catch(() => {
      res.status(500).send('server error')
    })
})

router.post('/delete', function(req, res, next) {
  const { _id} = req.body
  if (!_id) {
    res.send({code: -1, message: 'id required'})
    return
  }
  UserModel
    .deleteOne({_id})
    .then(() => {
      res.send({code : 0, message: 'delete success!'})
    })
    .catch(() => {
      res.status(500).send('server error')
    })
})

module.exports = router;
