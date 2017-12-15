var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
_Config.local = {
	host : ip,
	port : port,
	defaulController : "home",
	defaulAction     : "index"
}