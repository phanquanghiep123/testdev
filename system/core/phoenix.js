function Phoenix(argument) {
	const _db    = require("./db.js");
	const _input = require("./input.js");
	this.db      = new _db();
	this.input   = new _input();
	this.waitdding = 0;
	this.info = {};
	this.info.view       = [];
	this.info.model      = [];
	this.info.controller = [];
	this.info.error      = [];
	this.info.layout     = [];
	this.info.routes     = {};
	this.contentType     = "text/html";
	this.wait = function(){
		this.waitdding++;
	} 
	this.endwait = function(){
		this.waitdding--;
	}
	this.next = function(){
		this.response.next();
	}
	this.end = function(){
		this.load.views = "";
		this.waitdding  = 0;
		this.info.view       = [];
		this.info.model      = [];
		this.info.controller = [];
		this.info.error      = [];
		this.info.layout     = [];
		this.listSection     = {};
		this.dataView        = "";
		this.layout          = "";
		this.response.end();
	}
	this.__construct = function(){
		this.response.writeHead(200, { 'Content-Type': this.contentType });
	}
	this.__destructors =  function(){
		var that = this; 
	    setInterval(function(){
	    	if(that.waitdding == 0){
	    		var errors = that.info.error;
		        if(ObjectLength(errors) > 0){
		        	var val;
		        	for (var key in errors){
		        		val = errors[key];
		        		write("<p>"+val.message+"<br/></p>");
			        	write("<p>"+val.detail+"<br/></p>");
		        	}
		        }else{
		        	write(that.load.views);
		        }
		        clearInterval(this);
		        that.end();
	    	}
	    }, 100); 
	}
	
}
module.exports = Phoenix;