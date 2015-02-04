'use strict';
var express = require('express');
var question = require('./questions.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var questionsList = question.correctQuestions();

var users = [];

app.set('port', (process.env.PORT || 3000))
app.use(express.static('public'));

io.on('connection', function(socket){

  /*io.emit('user connected', 'Hello');*/

  socket.on('user created', function(user){
    users.push(user);
    io.emit('online users', users);
  });

  socket.on('message', function(msg){
    io.emit('message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user diconnect');
  });

});

http.listen(app.get('port'), function(){
  console.log('listening on *:3000');
});
//sd
