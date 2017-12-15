function Input (){
	this.post = function ($name = null){
		if($name == null){
			return _Phoenix.request.body;
		}else{
			if(typeof _Phoenix.request.body[$name] !== "undefined")
				return _Phoenix.request.body[$name];
			else
				return null;
		}
	}
	this.get = function ($name = null){
		if($name == null){
			return _Phoenix.request.query;
		}else{
			if(typeof _Phoenix.request.query[$name] !== "undefined")
				return _Phoenix.request.query[$name];
			else
				return null;
		}
	}
	this.file = function($name){
		if($name == null){
			return _Phoenix.request.files;
		}else{
			if(typeof _Phoenix.request.files[$name] !== "undefined")
				return _Phoenix.request.files[$name];
			else
				return null;	 
		}
	}
}
module.exports = Input;