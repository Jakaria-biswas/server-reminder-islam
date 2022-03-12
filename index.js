const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { ObjectID } = require('bson');
require('dotenv').config()
const port = 4949;

const app = express();
app.use(bodyParser.json())
app.use(cors())

// const uri = 'mongodb://127.0.0.1:27017/';
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.me6u3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err => {

       
       app.get('/', (req, res) => {
              res.send("<h3>the server working</h3>")
       })


       const allTalk = client.db("reminder-islam").collection("all-talk");
       app.post('/addTalk', (req, res) => {

              const info = req.body;
              allTalk.insertOne(info)
                     .then(result => {
                            res.send(result.acknowledged == true)
                     })

       })

       app.get('/getAllTalk', (req, res) => {

              allTalk.find({})
                     .toArray((error, document) => {
                            res.send(document)
                     })
       })
       app.get('/getDetailTalk/:id', (req,res)=> {
                
                 allTalk.find({_id: ObjectID(req.params.id)})
                 .toArray((error, document)=> {
                          res.send(document[0])
                 })
       })
      
}))























app.listen(process.env.PORT || port)

