'use strict';
var express = require('express')
var app = express();
var fs = require('fs');
var jsonData;

fs.readFile('./public/freebase_countries.json', 'utf8', function(err, data){
    jsonData = data;
    console.log(jsonData);
});

//console.log(jsonData);

app.use(express.static('public'));

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});