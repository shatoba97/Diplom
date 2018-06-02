const express = require('express');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
const app = express();
const port = 8000;
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');

app.engine('ejs', require('ejs-locals'));
app.set("views engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/src"));

var ObjectID = require('mongodb').ObjectID;
app.use(bodyParser.urlencoded({
  extended: true
}));
MongoClient.connect(db.url, (err, database) => {

  // if (err) {
  //   return new Error('Sorry Error'); 
  // }

  app.get('/', function (req, res) {
    res.sendfile('index.html');
  });

  app.get('/who-work', function (req, res) {
    res.sendfile('index.html');
  });

  app.get('/add-test', function (req, res) {
    res.sendfile('./src/html/addTest.html');
  })

  app.post('/add-test', urlencodedParser, (req, res) => {
    console.log(req.body);

    database.collection('Tests').insertOne(req.body, (err, result) => {
      if (err) {
        console.log('err', err);
      } else {
        const url = `http://localhost:8000/test/?id=${result.ops[0]._id}`
        res.send({
          'url': url
        });
      }
    })
  });

  app.get(`/test/`, (req, res) => {
    database.collection('Tests').findOne({
      '_id': new ObjectID(req.param('id'))
    }, (err, result) => {
      if (err) {
        console.log('err', err)
      } else {console.log(result.nameTest);
        res.render("modul.ejs", {
          name: result.nameTest,
          question: result.question,
          price: result.price,
          desqription: result.description,

      });
      }
    })
  })
  app.get(`/test-show/`, (req, res) => {
    database.collection('Tests').findOne({
      '_id': new ObjectID(req.param('id'))
    }, (err, result) => {
      if (err) {
        console.log('err', err)
      } else {console.log(result);
        res.send(result);
      }
    })
  })
  app.get(`/for-test`, (req, res) => {
    
        res.sendfile('./src/html/test.html');
  })
  app.get('/list-test', (req, res) => {
    res.sendfile('./src/html/listTest.html');
  });

  app.get('/all-test', (req, res) => {
    database.collection('Tests').find().toArray((err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result)
      }
    });
  });

  app.get('/search/', (req, res) => {
    const cursor = database.collection('Tests').find().toArray();
    cursor.then(elem => res.send(elem.map(result => {
      if (result.nameTest.includes(req.param('name'))) {
        return result;
      }
    })));
  });

  app.listen(port, function () {
    console.log('Example app listening on port ', port, ' !');
  });
});