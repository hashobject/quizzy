'use strict';
var questions = [],
    countries = [],
    fs = require('fs'),
    jf = require('jsonfile'),
	JSON5 = require('json5'),
    jsonData,
    consonantals = ["б", "в", "г", "ґ", "д", "ж", "з", "к", "л", "м", "н", "п", "р", "с", "т", "ф", "х", "ц", "ч", "ш", "щ", "й"],
    vowels = ["а", "е", "и", "і", "о", "у", "є", "ю", "я", "ї"];

fs.readFile('./public/freebase_countries.json', 'utf8', function(err, data){

    jsonData = JSON5.parse(data);

    getDataFromJson(jsonData);

    jf.writeFile('generatedCountries.json', countries);

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

function getDataFromJson(json) {

	for(var i in json){

        var country = countryNameToGenitiveForm(json[i].name),
            capital = json[i].capital;

        if(country && capital){
            if(country.split(' ').length === 1){
                countries.push(
                    JSON.stringify(
                        {
                            question: 'Столиця ' + country + '?', answer: capital
                        }
                    )
                );
            }
        }
	}
}

/*exports.correctQuestions = function() {
    return questions;
}*/
