'use strict';
var questions = [],
    fs = require('fs'),
	JSON5 = require('json5'),
    correctNameEnding,
    jsonData;

var originCountries = ['Україна', 'Англія', 'Франція', 'Іспанія', 'Німеччина', 'Чехія', 'Молдова', 'Уельс', 'Китай', 'Азербайджан', 'Чилі'];

//fs.readFile('./public/freebase_countries.json', 'utf8', function(err, data){
//    jsonData = JSON5.parse(data);
//    getDataFromJson(jsonData, questions);
//    console.log(questionsJS.questions);
//});

for(var i in originCountries) {
    correctNameEnding = changeCountryNameEnding(originCountries[i]);
    questions.push(correctNameEnding);
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
        case 'и':
            correctName = nameWithoutEnding;
            break;
        default:
            correctName = country;
    }

    return correctName;
}

//function getDataFromJson(json, question) {
//	for(var i in json){
//		if(json[i].capital !== null) {
//			question.push({"name": json[i].name, "capital": json[i].capital});
//		}
//		else {
//			question.push({"name": json[i].name, "capital": json[i].name});
//		}
//	}
//}

exports.correctQuestions = function() {
    return questions;
}
