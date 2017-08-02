var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

var express = require("express"),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

var port = process.env.PORT || 8080;

var creds = JSON.parse(fs.readFileSync('/opt/service-bind/binding').toString());

var mongo_host = 'mongodb://service-mongo/sentimentdb';


var nlu_inst = require('watson-developer-cloud/natural-language-understanding/v1.js');
var nlu = new nlu_inst({
  'username': creds.username,
  'password': creds.password,
  'version_date': '2017-02-27'
});

app.use(express.static(__dirname + '/public'));

app.get('/getSentiment', function (request, response) {

  var sentence = request.query.sentence;
  console.log('Sentence = ' + sentence);
  
  if (!sentence){
  	response.end('{"status": "failed", "error": "no sentence to process"}');
  }
  //response.end('Hi');
  
  var parameters = {
  'text': sentence,
  'features': {
    'sentiment': {}
    }
  };
  
  nlu.analyze(parameters, function(err, content) {
	  if (err){
	    console.log('error:', err);
	    response.end(JSON.stringify(err));
	  }
	  else {
	  	console.log('success:', content);
	    response.end(JSON.stringify(content));
	  }
  });

});


app.post('/addSentence', function (req, res) {
	

	// Connect to the db
	MongoClient.connect(mongo_host, function(err, db) {
	  	if(err) {
	   	 console.log("Error connecting to MongoDB");
	  	}
	  	
      collectionSend = db.collection('sentences');
      
      console.log(req.body);
	  	
	  	collectionSend.insert(req.body,function (err, result) {
	    if (err) {
	      console.log(err);
	   } else {
	      console.log('Document inserted successfully');
	    }
	  	
	  	db.close();
	});

   		res.end("{\"result\":\"success\"}");
   });
});


app.get('/listHistory', function (req, res) {
	
	// Connect to the db
	MongoClient.connect(mongo_host, function(err, db) {
	  	if(err) {
	   	 console.log('Error connecting to MongoDB');
	  	}
	  	
	  	collectionGet = db.collection('sentences');
	  	
	  	collectionGet.find().sort( { ts: -1 } ).toArray(function(err, result) {
	  		
	  		if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	  		
       		res.end(JSON.stringify(result));
       		db.close();
	  	});
	  	
	});
});

app.listen(port);
console.log("Listening on port ", port);

require("cf-deployment-tracker-client").track();
