'use strict';
var express = require('express'),
<<<<<<< HEAD
    questionsJS = require('./questions.js'),
	app = express();

var questionsList = questionsJS.correctQuestions();
console.log(questionsList);
=======
    bodyParser = require('body-parser'),
	app = express(),
    messages = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/messages', function(req, res) {
	  messages.push(req.body.message);
});
>>>>>>> origin/make-chat-for-two-open-tabs

app.get('/messages', function(req, res) {
    res.send(messages);
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port);

});
<<<<<<< HEAD
=======


>>>>>>> origin/make-chat-for-two-open-tabs
