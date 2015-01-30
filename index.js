var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var jsonData;

fs.readFile('./public/freebase_countries.json', 'utf8', function (err, data) {
  if (err) throw err;
  jsonData = data;
  console.log(data);
});


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res){
	res.send(data);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
