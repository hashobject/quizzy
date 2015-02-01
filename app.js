'use strict';
var express = require('express'),
    questionsJS = require('./questions.js'),
	app = express();

var questionsList = questionsJS.correctQuestions();
console.log(questionsList);

app.use(express.static('public'));

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port);

});
