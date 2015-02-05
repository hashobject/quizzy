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

  socket.on('user created', function(user){
    io.emit('user greeting', 'Hello, ' + user + '!');
    users.push({name: user, connectionId: socket.id});
    io.emit('online users', users);
  });

  socket.on('message', function(msg){
    io.emit('message', msg);
  });

  socket.on('disconnect', function(){
    for(var i in users){
        if(users[i].connectionId === socket.id){
            users.splice(i, 1);
        }
    }
       io.emit('online users', users);
  });

});

http.listen(app.get('port'), function(){
  console.log('listening on *:3000');
});
