var express = require('express');
var router = express.Router();

router.post('/who-work', function(req, res) {
  res.sendFile('whoWork.json' , { root: './src/tests'});
});
router.get('/who-work', function(req, res) {
  res.sendFile('whoWork.html' , { root: './src/html'});
});
router.get('/add-test', function(req, res) {
  res.sendFile('addTest.html' , { root: './src/html'});
});

module.exports = router;