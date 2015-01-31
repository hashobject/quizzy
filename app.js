'use strict';
var express = require('express'),
	fs = require('fs'),
	JSON5 = require('json5'),
	app = express(),
	jsonData;

var questions = [];

var originCountries = ['Україна', 'Англія', 'Франція', 'Іспанія', 'Німеччина', 'Чехія', 'Молдова', 'Уельс', 'Китай', 'Азербайджан'];

fs.readFile('./public/freebase_countries.json', 'utf8', function(err, data){
    jsonData = JSON5.parse(data);
    getDataFromJson(jsonData, questions);
    var correctNameEnding;
    for(var i in originCountries) {
        correctNameEnding = changeCountryNameEnding(originCountries[i]);
        console.log(correctNameEnding);
    }
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

function changeCountryNameEnding(country) {
    var countryLength = country.length,
        endings = country[countryLength-1],
        nameWithoutEnding = country.slice(0, countryLength-1),
        correctName;

    switch(endings) {
        case 'а':
            correctName = nameWithoutEnding+'и';
            break;
        case 'я':
            correctName = nameWithoutEnding+'ї';
            break;
        case 'й':
            correctName = nameWithoutEnding+'я';
            break;
        case 'н':
            correctName = nameWithoutEnding+'на';
            break;
        case 'р':
            correctName = nameWithoutEnding+'ра';
            break;
        case 'с':
            correctName = nameWithoutEnding+'са';
            break;
        case 'ь':
            correctName = nameWithoutEnding+'і';
            break;
        case 'м':
            correctName = nameWithoutEnding+'ма';
            break;
    }

    return correctName;
}

