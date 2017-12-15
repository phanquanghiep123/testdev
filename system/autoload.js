function Autoload() {
	this.config     = require('./core/config.js');
	this.phoenix    = require('./core/phoenix.js');
	this.setup      = require('./config/setup.js');
	this.http       = require('./core/http.js');
	this.route      = require('./core/route.js');
	this.controller = require('./core/controller.js');
	this.model      = require('./core/model.js');
	this.midellwell = require( './core/midellwell.js');
	require('./core/helper.js');
}
module.exports = Autoload;