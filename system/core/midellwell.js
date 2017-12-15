function Midellwell (){
	this.redirect  = function($url){
		_Controller.redirect($url);
		return true;
	}
}
module.exports = Midellwell;