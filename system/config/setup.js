function setup(argument) {
	// set folder.
	this._F_app        = "/application/";
	this._F_system     = "/system/";
	this._F_config     = "/config/";
	this._F_controlers = this._F_app + "controllers/";
	this._F_views      = this._F_app + "views/";
	this._F_helpers    = this._F_app + "helpers/";
	this._F_models     = this._F_app + "models/";
	this._F_librarys   = this._F_app + "librarys/";
	this._F_https      = this._F_app + "https/";
	this._F_config     = this._F_app + "config/";
	this._F_core       = this._F_app + "core/";
	// !set folder.
}
module.exports = setup;