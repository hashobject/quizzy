'use strict';
var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var question,
    questionsList = JSON.parse(fs.readFileSync('./generatedCountries.json', 'utf8'));

var users = [];

sendQuestion();

io.on('connection', function(socket){

    io.emit('leaders', users.sort(function(obj1, obj2){

        return obj2.points - obj1.points;

    }));

    socket.on('user created', function(user){

        io.emit('user greeting', 'Hello, ' + user + '!');

        users.push({name: user, connectionId: socket.id, points: 0, correctAnswersRow: 0});

        io.emit('online users', users);

    });

    io.emit('online users', users);

    socket.on('message', function(msg){

        var answer = msg.message;

        io.emit('message', msg);

        io.emit('answer', checkTheAnswer(answer, socket));

        io.emit('leaders', users.sort(function(obj1, obj2){

            return obj2.points - obj1.points;

        }));

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


function sendQuestion(){

    question = getRandomQuestion();

    app.get('/question', function(request, response) {

        response.send(question);

    });

}

function getRandomQuestion(){

    var randomQuestion = questionsList[Math.floor(Math.random()*questionsList.length)];

    return JSON.parse(randomQuestion);

}

function checkTheAnswer(userAnswer, socket){

    if(question.answer.toLowerCase() === userAnswer.toLowerCase()){

        users.forEach(function(user){

            if(user.connectionId === socket.id){

                user.correctAnswersRow = user.correctAnswersRow + 1;

                user.points = user.points + user.correctAnswersRow;

            }

            else{
                user.correctAnswersRow = 0;
            }

        });

        question = getRandomQuestion();

        return question;
    }

}


