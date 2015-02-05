'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var leaders = [{name: 'Anton', points: 50}, {name: 'Pasha', points: 60}, {name: 'Maryna', points: 70}];


app.set('port', (process.env.PORT || 3000))
app.use(express.static('public'));

io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});

http.listen(app.get('port'), function(){
  console.log('listening on *:3000');
});
//sd

app.get('/leaders', function(request, response) {
	for(var i in leaders) {
		leaders[i].points = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
	}
	leaders.sort(function(obj1, obj2){
		return obj2.points - obj1.points;
	});
	response.send(leaders);
})

var server = app.listen(3000, function () {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port);

});