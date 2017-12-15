var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'fristabc-testdev.1d35.starter-us-east-1.openshiftapps.com';
var express = require('express');
var app = express();
app.get('/', function(req, res){
  res.send('hello world');
});
app.get('/home', function(req, res){
  res.send('hello world');
});
app.listen(server_port,server_ip_address,function(){
	console.log("listen server !!!! ");
});