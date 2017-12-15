function Model() {
	const _db      = require("./db.js");
	const _input   = require("./input.js");
	const _load    = require("./loader.js");
	this.load      = new _load();
	this.db        = new _db();
	this.input     = new _input();
	this.table     = null;
	this.key       = null;
	this.colums    = [];
	this.list      = [];
	this._callback = null;
	this.validate  = null;
	this._sql      = null;
	this._new      = 0;
	this._selects  = [];
	this._where    = [];
	this._wherein  = [];
	this._wherenotin  = [];
	this._joins    = [];
	this._limit    = [];
	this._order    = [];
	this._group    = [];
	this._having   = [];
 	this.__construct = function(){
		if(this.table  == null || this.key == null){
			_Phoenix.info.error.push({detail:"Model error" ,message : "Error: Please add name and key for table!"});
			return false;
		}else{
			this[this.key] = 0;
		}
		return true;
	}
	this.select = function ($data = null){
		if(typeof $data == "object"){
			for (var i in $data){
				this._selects.push($data[i]);
			}
			
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to select function must be an array"});
		}
		return this;
	}
	this.where = function($data = null){
		if(typeof $data == "object"){
			for(var i in $data){
				this._where.push($data[i]);
			}	
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to where function must be an array"});
		}
		return this;
	}
	this.wherein  = function($key = null ,$in = []){
		this._wherein.push({key:$key,in:$in});
		return this;
	}
	this.wherenotin  = function($key = null ,$in = []){
		this._wherenotin.push({key:$key,in:$in});
		return this;
	}
	this.innerjoin = function($table, $ondata = null, $and = null){
		if(typeof $ondata == "object"){
			this._joins.push({table : $table, on : $ondata, and : $and, type: 0});
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to innerjoin function must be an array"});
		}
		return this;
	}
	this.leftjoin = function($table,$ondata,$and = null){
		if(typeof $ondata == "object"){
			this._joins.push({table : $table, on : $ondata, and : $and, type: 1});
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to leftjoin function must be an array"});
		}
		return this;
	}
	this.rightjoin = function($table,$ondata,$and = null){
		if(typeof $ondata == "object"){
			this._joins.push({table : $table, on : $ondata, and : $and, type: 2});
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to rightjoin function must be an array"});
		}
		return this;
	}
	this.limit = function($offset = null,$limit = null){
		if($limit != null && typeof $limit == "number"){
			this._limit.push($limit);
		}
		if($offset != null && typeof $offset == "number"){
			this._limit.push($offset);
		}
		return this;
	}
	this.orderby = function($order){
		if(typeof $order == "object"){
			this._order.push($order);
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to orderpby function must be an array"});
		}
		return this;
	}
	this.groupby = function($group){
		if(typeof $group == "object"){
			this._group.push($group);
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to groupby function must be an array"});
		}
		return this;
	}
	this.record  = function(){
		var that  = new Object;
		for (var i in this){
			that[i] = this[i];
		}
		this.db.get(that,0);
		this._callback = null;
		return this;
	}
	this.result  = function(){
		var that  = new Object;
		for (var i in this){
			that[i] = this[i];
		}
		this.db.get(that,1);
		this._callback = null;
		return this;
	}
	this.destroy = function (){
		var that  = new Object;
		for (var i in this){
			that[i] = this[i];
		}
		if(that.list !== null){
			for (var i in that.list ){
				that.db.destroy(that.list[i]);
			}
		}
		that.db.destroy(that);
		that._callback = null; 
		that.addnew();
		return that;
	}
	this.save = function(){
		var that  = new Object;
		for (var i in this){
			that[i] = this[i];
		}
		this.db.save(that);
		this._callback = null; 
	}
	this.reset = function(){
		this._sql         = null;
		this._callback    = null;
		this.list 		  = null;
		this._selects     = [];
		this._where       = [];
		this._wherein     = [];
		this._wherenotin  = [];
		this._joins       = [];
		this._limit       = [];
		this._order       = [];
		this._group       = [];
		this._having      = [];
		return this;
	}
	this.find = function($id){
		var that  = new Object;
		for (var i in this){
			that[i] = this[i];
		}
		this.db.find(that,$id);
		this._callback = null;
		return this;
	}
	this.addnew = function(){
		var that  = new Object;
		for (var i in this){
			that[i] = this[i];
		}
		that._new         = 1;
		that._sql         = null;
		that._selects     = [];
		that._where       = [];
		that._wherein     = [];
		that._wherenotin  = [];
		that._joins       = [];
		that._limit       = [];
		that._order       = [];
		that._group       = [];
		that._having      = [];
		that._callback     = null;
		that.list         = null;
		that.__construct(); 
		return that;
	}
	this.toList = function($data){
		this.list = $data;
		return $data;
	}
	this.reader = function(){
		this.db.reader(this);
		return this;
	}
	this.callback = function($callback){
		this._callback = $callback;
		return this;
	}
}
module.exports = Model;