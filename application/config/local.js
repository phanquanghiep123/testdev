var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
_Config.local = {
	host : server_ip_address,
	port : server_port,
	defaulController : "home",
	defaulAction     : "index"
}