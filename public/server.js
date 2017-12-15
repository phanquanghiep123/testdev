_Path         = __dirname + "/";
_Fs   	      = require('fs');
var _require  = require(_Path + '../system/autoload.js');
_Autoload     = new _require();
_App          = null ;
_Response     = null;
_Request      = null;
_Setup        = new _Autoload.setup();
//--------------------------set path folder------------------------------------------;
_F_controlers = _Path + ".." + _Setup._F_controlers;
_F_views      = _Path + ".." + _Setup._F_views;
_F_helppers   = _Path + ".." + _Setup._F_helppers;
_F_libralys   = _Path + ".." + _Setup._F_libralys;
_F_https      = _Path + ".." + _Setup._F_https;
_F_models     = _Path + ".." + _Setup._F_models;
_F_config     = _Path + ".." + _Setup._F_config;
_F_core       = _Path + ".." + _Setup._F_core;

//-------------------------------------------!set path folder--------------------------------------------;

//-------------------------------------------load libelary--------------------------------------------;
	//--------------------------------------------set user config --------------------------------------------//
	
	_Config = new _Autoload.config();
	require(_F_config + 'local');
	require(_F_config + 'database');

	//--------------------------------------------!set user config --------------------------------------------//
	_App         = null;
	_Phoenix     = new _Autoload.phoenix();
	_Route       = new _Autoload.route();
	_Http        = new _Autoload.http();
	_Midellwell  = new _Autoload.midellwell();
	_Controller  = new _Autoload.controller();
	_Controller  = Object.assign(_Phoenix,_Route,_Http,_App,_Midellwell,_Controller);
	//----------------------------------------------!load libelary--------------------------------------------;

//-----------------------------------------------Add custom route---------------------------------;
require(_F_core  + "autoload.js");
require(_F_https + "midellwell.js");
require(_F_https + "route.js");
//-----------------------------------------------!Add custom route---------------------------------;