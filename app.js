'use strict';
var express = require('express');
var questions = require('./questions.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var questionsList = questions.correctQuestions();
var question;

var users = [];
var leaders = [{name: 'Anton', points: 50}, {name: 'Pasha', points: 60}, {name: 'Maryna', points: 70}];

question = getRandomQuestion();

function getRandomQuestion(){
    var randomQuestion = questionsList[Math.floor(Math.random()*questionsList.length)];
    return randomQuestion;
}

function checkTheAnswer(userAnswer){
    if(question.answer.toLowerCase() === userAnswer.toLowerCase()){
        question = getRandomQuestion();
        return question;
    }
}

app.set('port', (process.env.PORT || 3000))
app.use(express.static('public'));

app.get('/leaders', function(request, response) {
	for(var i in leaders) {
		leaders[i].points = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
	}
	leaders.sort(function(obj1, obj2){
		return obj2.points - obj1.points;
	});
	response.send(leaders);
});

app.get('/question', function(request, response) {
    response.send(question);
});

io.on('connection', function(socket){

  socket.on('user created', function(user){
    io.emit('user greeting', 'Hello, ' + user + '!');
    users.push({name: user, connectionId: socket.id});
    io.emit('online users', users);
  });

    io.emit('online users', users);

  socket.on('message', function(msg){
    var answer = msg.message;
    io.emit('message', msg);
    io.emit('answer', checkTheAnswer(answer));
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
