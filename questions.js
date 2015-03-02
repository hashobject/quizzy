'use strict';
var questions = [],
    fs = require('fs'),
	JSON5 = require('json5'),
    genitiveCountry,
    jsonData,
    consonantals = ["б", "в", "г", "ґ", "д", "ж", "з", "к", "л", "м", "н", "п", "р", "с", "т", "ф", "х", "ц", "ч", "ш", "щ", "й"],
    vowels = ["а", "е", "и", "і", "о", "у", "є", "ю", "я", "ї"];

var originCountries = ['Україна', 'Англія', 'Франція', 'Іспанія', "Конго",'Німеччина', 'Чехія', 'Молдова', 'Уельс', 'Китай', 'Азербайджан', 'Чилі', "Беліз", "Бангладеш"];

//fs.readFile('./public/freebase_countries.json', 'utf8', function(err, data){
//    jsonData = JSON5.parse(data);
//    getDataFromJson(jsonData, questions);
//    console.log(questionsJS.questions);
//});

originCountries.forEach(function(country){
    genitiveCountry = countryNameToGenitiveForm(country);
    questions.push(genitiveCountry);
});

function countryNameToGenitiveForm (country) {

    var countryEnding = country[country.length-1],
        countryWithoutEnding = country.slice(0, country.length - 1),
        newCountryForm;

    for(var i in consonantals){

        if(countryEnding === consonantals[i] && countryEnding !== 'й' && countryEnding !== 'ш' && countryEnding !== 'з'){
            newCountryForm = country + 'у';
        }
        else if(countryEnding === 'й'){
            newCountryForm = countryWithoutEnding + "ю";
        }
        else if(countryEnding === 'ш'){
            newCountryForm = country;
        }
        else if(countryEnding === 'з'){
            newCountryForm = country + 'а';
        }
    }

    if(countryEnding === 'я'){
        newCountryForm = countryWithoutEnding + 'ї';
    }
    else if(countryEnding === 'а'){
        newCountryForm = countryWithoutEnding + 'и';
    }
    else if(countryEnding === 'і' || countryEnding === 'о' || countryEnding === 'у' || countryEnding === 'е'){
        newCountryForm = country;
    }

    return newCountryForm;
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
