var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var http = require("http");
var server = http.createServer(function(request, response) {
	  response.writeHead(200, {"Content-Type": "text/html"});
	  response.write("<!DOCTYPE "html">");
	  response.write("<html>");
	  response.write("<head>");
	  response.write("<title>Hello World Page</title>");
	  response.write("</head>");
	  response.write("<body>");
	  response.write("Hello World!");
	  response.write("</body>");
	  response.write("</html>");
	  response.end();
});

server.listen(server_port,server_ip_address);
console.log("Server is listening");