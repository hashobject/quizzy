'use strict';
var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var question,
    questionsList = JSON.parse(fs.readFileSync('./generatedCountries.json', 'utf8'));

var users = [];
var leaders = [{name: 'Anton', points: 50}, {name: 'Pasha', points: 60}, {name: 'Maryna', points: 70}];

var isAnswered = false;


question = getRandomQuestion();

sendLeaders(leaders);

sendQuestion(question)

io.on('connection', function(socket){

    questionExpiration();

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

app.set('port', (process.env.PORT || 3000))
app.use(express.static('public'));

http.listen(app.get('port'), function(){
  console.log('listening on *:3000');
});

function sendLeaders(leaders){
    app.get('/leaders', function(request, response) {
        leaders.map(function(leader){
            leader.points = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
        });

        leaders.sort(function(obj1, obj2){
            return obj2.points - obj1.points;
        });

        response.send(leaders);
    });
}

function sendQuestion(question){
    app.get('/question', function(request, response) {
        response.send(question);
    });
}

function getRandomQuestion(){
    var randomQuestion = questionsList[Math.floor(Math.random()*questionsList.length)];
    //isAnswered = true;
    return JSON.parse(randomQuestion);
}

function checkTheAnswer(userAnswer){
    if(question.answer.toLowerCase() === userAnswer.toLowerCase()){
        isAnswered = true;
        question = getRandomQuestion();
        return question;
    }
}

function questionExpiration(){
    if(!isAnswered){
        setInterval(function(){
            question = getRandomQuestion();
            var newQuestion = {bot: 'The time is up!', question: question}
            io.emit('question expiration', newQuestion);
        }, 20000);
    }
}
