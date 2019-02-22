'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const port = 3800;

var db

// Remember to change YOUR_USERNAME and YOUR_PASSWORD to your username and password! 
MongoClient.connect('mongodb+srv://jkmisaza:JKMdatabase1804@cluster0-jklyc.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err)
  db = database.db('test');
  app.listen(port || 3000, () => {
    console.log(`listening on ${port}`);
  })
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/api/users', (req, res) => {
  db.collection('users').find().toArray((err, result) => {
    if (err) return res.send(err);
    res.send(result);
  })
})

app.post('/api/users', (req, res) => {
  db.collection('users').insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  })
})

app.put('/api/users', (req, res) => {
  const userId = req.body.id;
  db.collection('users')
  .findOneAndUpdate({id: userId}, {
    $set: {
      id: req.body.id,
      name: req.body.name,
      wins: req.body.wins
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
