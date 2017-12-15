CapitalizeFirstLetter = function(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
Gen_Slug = function(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();
	// remove accents, swap ñ for n, etc
	var from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ";
	var to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydAAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYD-";
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}
	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes
	return str;
};
EscapeString = function(str) {
	str = str.trim();
	return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
		switch (char) {
			case "\0":
				return "\\0";
			case "\x08":
				return "\\b";
			case "\x09":
				return "\\t";
			case "\x1a":
				return "\\z";
			case "\n":
				return "\\n";
			case "\r":
				return "\\r";
			case "\"":
			case "'":
			case "\\":
			case "%":
				return "\\" + char; // prepends a backslash to backslash, percent,
				// and double/single quotes
		}
	});
}
CheckLogin = function() {
	if (_SessionInfor.Username == undefined && _SessionInfor.Password == undefined) {
		_Controller.response.redirect('/admin/login');
	}
}
CheckDoneLogin = function() {
	if (_SessionInfor.Username !== undefined && _SessionInfor.Password !== undefined) {
		_Controller.response.redirect('/admin');
	}
}
joinArray = function(InputArray, str) {
	var array = [];
	for (x in InputArray) {
		array.push(InputArray[x]);
	}
	var string = array.join(str);
	return string;
}
write = function(string) {
	string = String(string);
	_Controller.response.write(string);
	return true;
}
base_url = function(url = null){
	var base = _Config.local.host;
	if(url != null){
		var first_char = url.substring(0, 1);
		if(first_char == "/"){
			base =  (_Config.local.host +  url);
		}else{
			base =  (_Config.local.host + "/" + url);
		}
	}
	base = base.replaceAll("////","");
	base = base.replaceAll("///","");
	base = base.replaceAll("//","");
	return base;
}
HttpRequestPost = function($key = null){
	if(_Method == "post"){
		if($key == null)
			return _Request.body;
		if (typeof _Request.param($key) === "undefined")
			return false;
		return  _Request.param($key);
	}
	return false;	
}
HttpRequestGet = function($key = null){
	if(_Method == "get"){
		if($key == null)
			return _Request.body;
		if (typeof _Request.param($key) === "undefined")
			return false;
		return  _Request.param($key);
	}
	return false;	
}

IsAjaxRequest = function(){
	return(_Request.xhr);
}
String.prototype.ReplaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
}
String.prototype.ReplaceKeyAll = function(array) {
	var target = this;
	for (var key in array) {
		target = target.ReplaceAll(key, array[key]);
	}
	return target;
}
cleanEmtyItemArray = function(array,deleteValue) {
	var newArray = [];
	for (var i = 0; i < array.length; i++) {
		if (array[i] != deleteValue) {
			newArray.push(array[i]);
		}
	}
	return newArray;
}
String.prototype.Addslashes = function() {
    this.replace(/\\/g, '\\\\').
    replace(/\u0008/g, '\\b').
    replace(/\t/g, '\\t').
    replace(/\n/g, '\\n').
    replace(/\f/g, '\\f').
    replace(/\r/g, '\\r').
    replace(/'/g, '\\\'').
    replace(/"/g, '\\"').
    replace("'", "\'");
    return this;
}
AutoloadMyController = function ($arg  = []){
	var val;
	if($arg.length > 0 ){
		for (var key in $arg){
			val = $arg[key];
			var include = require(_F_core + val["file"]);
			eval(val.name + " = new include(); "+val.name + " = Object.assign(_Controller,"+val.name+") ;");
		}
	}
	
}

RamdonString = function($num = 10) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < $num; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return "phoenix_" + text;
}

Route = function($name){
	try {
		if(typeof _Phoenix.info.routes[$name] == "undefined")
			_Phoenix.info.error.push({detail: "" ,message : "Error: Route `"+$name+"` not like any routes please check name !"});
		else 
			return _Phoenix.info.routes[$name]["url"];
	}
	catch (e) { 
		_Phoenix.info.error.push({detail: e ,message : "Error: Route `"+$name+"` not like any routes please check name !"});
	}
}
ObjectLength = function($o){
	return Object.keys($o).length;
}