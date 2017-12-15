function home (){
	this.extent   = MyController;
	this.index = function(){
		var  env = console.log(process.env); 
		for(var i in env){
			write ("dfgdfgdg <br>");
			write(i + ":" + env[i]);
		}
		this.load.view("master/layout.html");
	}
	this.demomodel = function(){
		var that = this;
		that.load.model("members"); 
		that.members.getall(function(r,f){
			r.foreach (function(key ,val){
				write("<html><body>");
				write(base_url(val.email)+"<br>");
				write("</body></html>");
			});
	
		},0,100); 
	}	
}
module.exports = home;

