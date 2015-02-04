'use strict';
var express = require('express');
var question = require('./questions.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var questionsList = question.correctQuestions();

app.set('port', (process.env.PORT || 3000))
app.use(express.static('public'));

io.on('connection', function(socket){

  /*io.emit('user connected', 'Hello');*/

  socket.on('message', function(msg){
    io.emit('message', msg);
  });

});

http.listen(app.get('port'), function(){
  console.log('listening on *:3000');
});
