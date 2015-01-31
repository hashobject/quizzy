'use strict';
var express = require('express'),
	fs = require('fs'),
	JSON5 = require('json5'),
	app = express(),
	jsonData;

var capitals = [],
	countries = [];

fs.readFile('./public/freebase_countries.json', 'utf8', function(err, data){
    jsonData = JSON5.parse(data);
    getDataFromJson(jsonData, capitals, countries);
   
   for(var i = 0; i<10; i++) {
    	console.log("Question " + (i+1) + ":");
    	console.log(countries[i]);
	    console.log("Answer " + (i+1) + ":");
	    console.log(capitals[i]);
	    console.log('');
    }
});

app.use(express.static('public'));

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port);

});

function getDataFromJson(json, cpt, cnt) {
	for(var i in json){
		if(json[i].capital !== null) {
			cpt.push(json[i].capital);
			cnt.push(json[i].name);
		}
		else {
			cpt.push(json[i].name);
			cnt.push(json[i].name);
		}
	}
}

