function signup (){
	this.extent = MyController;
	this.index  = function(){
		this.data.title = "Phoenix | Signup";
		this.load.view("frontend/auth/signup.html",this.data);
	}
	this.save = function (){
		this.validate.confirm_password = this.confirm_password;
		$check = this.validate.check(this.input.post(),{
			"full_name"         : {validate : "required",label : "Full name",messges : {required :"{$1} phải dc nhập"}},
			"you_email"         : {validate : "required|email",label : "Email"},
			"password"          : {validate : "required|mintext:6",label : "Password"},
			"confirm_password"  : {validate : "confirm_password",label : "Confirm password"}
		});
		if($check.validate == true){
			var data = {
				full_name : this.input.post("full_name"),
				email     : this.input.post("you_email"),
				password  : this.input.post("password"),
			}
			this.load.model("users");
			this.users.insert(data) ;
		}
	}
	this.confirm_password = function($value){
		this.messges.confirm_password = "Vui lòng nhập {$1} giống với Password";
		if($value.trim() != "" && $value != null){
			return ($value.trim() == this.input.post("password").trim());
		}
		return true;	
	}
}
module.exports = signup;

