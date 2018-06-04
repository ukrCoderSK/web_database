const mongoClient = require("mongodb").MongoClient
const express = require('express')
const app = express()

const url = "mongodb://localhost:27017/";

let usersDB;

mongoClient.connect(url, (err, db) => {
    if (err) throw err
    usersDB = db.db("npr-sv__bezhuk");
    console.log('db connection')
})

app.get('/getUsers', (req, res) => {
    usersDB.collection('users').find({name: req.query.name}).toArray((err, result) => {
        res.send(result)
    })
})

app.get('/addUser', (req, res) => {
    usersDB.collection('users').insertOne({name: req.query.name, age: req.query.age}, (err, result) => {
        res.send('Add user!')
    })
})

app.get('/removeUser', (req, res) => {
    usersDB.collection('user').deleteMany({name: req.query.name, age: req.query.age}, (err, result) => {
        res.send('Delete user!')
    })
})

app.get('/dropUser', (req, res) => {
  usersDB.collection('users').drop((err, result) => {
    res.send('Drop DB!')
  })
})

app.listen(3000, () => {
    console.log('Server start')
})
