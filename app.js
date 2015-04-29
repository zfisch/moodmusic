var express = require('express');
// var sentiment = require('sentiment');

var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('index.html');
});

var port = process.env.port || 3000;

var server = app.listen(port, function () {

  var host = server.address().address;

  console.log('Example app listening at http://%s:%s', host, port);

});