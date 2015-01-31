'use strict';
var express = require('express'),
	fs = require('fs'),
	JSON5 = require('json5'),
	app = express(),
	jsonData;

var questions = [];

fs.readFile('./public/freebase_countries.json', 'utf8', function(err, data){
    jsonData = JSON5.parse(data);
    getDataFromJson(jsonData, questions);
    console.log(questions);
});

app.use(express.static('public'));

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port);

});

function getDataFromJson(json, question) {
	for(var i in json){
		if(json[i].capital !== null) {
			question.push({"name": json[i].name, "capital": json[i].capital});
		}
		else {
			question.push({"name": json[i].name, "capital": json[i].name});
		}
	}
}

