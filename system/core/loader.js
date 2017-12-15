function Loader() {
	this.model = function($file){
		try {
			_Controller.info.model.push({file : $file});
			var _model  = require(_F_models + $file );
            var model   = new _model();
            var PModel  = new _Autoload.model();
            var Megge   = new Object;
            for (var i in PModel){
            	Megge[i] = PModel[i];
            }
            for (var i in model){
            	Megge[i] = model[i];
            }
            Megge._name = $file;
            _Controller[$file] = Megge;
            var check = _Controller[$file].__construct();
            if(check == true)
            	return _Controller[$file];
        	else return false;

		}catch (e){
			if (e instanceof SyntaxError) _Phoenix.info.error.push({detail:e ,message : e.message});
			else _Phoenix.info.error.push({detail:e ,message : e});
		}
	}
	this.view  = function( $file = "", $data = {}, $return = false){
		_Phoenix.info.view.push({file : $file});
		try {
			var view = _Phoenix.loadview($file, $data, $return);
			if($return === false){
				if(Object.keys(_Phoenix.info.error).length == 0 ){
					write(view);
				}
			}
			else 
				return view;
		}catch (e){
			if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
			else _Controller.info.error.push({detail:e ,message : e});
		}	
	}
}
module.exports = Loader;