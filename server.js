/*
	Inferstrat
*/

var express = require("express");
var app = express();
var http = require('http').Server(app);
var router = express.Router();
var logger = require("logging_component");
var url = require("url");

var bodyParser   = require('body-parser');
var MongoClient  = require('mongodb').MongoClient;

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//MongoDB Connection Details
var cloudMonGoDBConfig = {
	mongoData		: process.env.MONGODB_DATA 			|| 'mongodb://admin:admin@ds113630.mlab.com:13630/smartcom_data'
}


var path = __dirname + '/public/';
app.use('/assets', express.static(path + 'assets'));
app.use("/", router);


router.use(function (req, res, next) {
	var headers = req.headers;
	var userAgent = headers['user-agent'];
	logger.log('User Agent - ' + userAgent + ', Request - ' + req.method);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//All URL Patterns Routing
app.get("/", function(req,res){
	res.redirect('/index');
});

app.get("/index", function(req,res){
	res.sendFile(path + "index.html");
});	

app.get("/services", function(req,res){
	res.sendFile(path + "services.html");
});	

app.get("/smartcom", function(req,res){
	res.sendFile(path + "smartcom.html");
});	

app.get("/demo", function(req,res){
	res.sendFile(path + "demo.html");
});	

app.get("/contactus", function(req,res){
	res.sendFile(path + "contactus.html");
});	


http.listen(process.env.PORT || 3001, () => {				
	logger.log('##################################################');
	logger.log('        Inferstrat | Credentials');
	logger.log('        Process Port :' + process.env.PORT);
	logger.log('        Local Port   :' + 3001);
	logger.log('##################################################');
});	