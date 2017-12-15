function Form() {
	this.stringFrom  = "";
	this.ListForm    = {};
	this.CurentName  = null;
	this.Status      = true;
	this.addStarFrom = false;
	this.start = function($name = null,$attr = {}){
		if(this.Status == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please end form before start form!"});
			return false;
		}
		this.CurentName = $name;
		this.ListForm[this.CurentName] = [];
		this.Status      = false;
		this.addStarFrom = true;
		var attString = "";
		if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<form name="'+this.CurentName+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<form name="'+this.CurentName+'" '+attString+'>';
		}
		return true;
	}
	this.inputText = function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "text"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="text" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="text" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputEmail= function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "email"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="email" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="email" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputNumber= function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "email"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="number" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="number" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputTextarea = function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "textarea"
		});
		var attString = "";
		var value     = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					if(i == "value") value = $attr[i];
					else attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<textarea name="'+$name+'" '+attString+'>'+value+'</textarea>';
		}else{
			_Phoenix.layout += '<textarea name="'+$name+'" '+attString+'>'+value+'</textarea>';
		}
		return true;
	}
	this.inputPassword = function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "password"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="password" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="password" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputDate = function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "date"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="date" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="date" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputCheckbox = function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "checkbox"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="checkbox" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="checkbox" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputRadio = function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "radio"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="radio" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="radio" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputSelect = function($name = null,$attr = {},$table = null, $key_value,$key_label,$active = null){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "select",
			key_value:$key_value,
			key_label:$key_label,
			active:$active
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		var stringOption = '<select name="'+$name+'" '+attString+'>';
		if($table != null){
			var active = "";
			$table.foreach(function(k,v){
				if(typeof v[$key_value] !== "undefined" && typeof v[$key_label] !== "undefined"){
					if($active == v[$key_value]) active = "selected";
				    else active = "";
					stringOption += '<option value="'+v[$key_value]+'" '+active+'>'+v[$key_label]+'</option>';
				}
			});	
		}
		stringOption += '</select>';
		if(!_Phoenix.islayout){
			_Phoenix.dataView += stringOption;
		}else{
			_Phoenix.layout += stringOption;
		}
		return true;
	}
	this.inputFile = function($name,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "file"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="file" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="file" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputSubmit = function($name,$attr = {}){
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "submit"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="submit" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="submit" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputButton = function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "textarea"
		});
		var attString = "";
		var label     = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					if(i == "label") label = $attr[i];
					else attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<button name="'+$name+'" '+attString+'>'+label+'</button>';
		}else{
			_Phoenix.layout += '<button name="'+$name+'" '+attString+'>'+label+'</button>';
		}
		return true;
	}
	this.end = function(){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before end form!"});
			return false;
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '</form>';
		}else{
			_Phoenix.layout += '</form>';
		}
		
		return true;
	}
}
module.exports = Form;