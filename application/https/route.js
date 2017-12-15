_Route.add(
	{   
		name       : "home.index", //unquie display name for url ex: (this.route("home.index"))
		type       : "get",//put or post or get or all.
		url        : "/",//listening request.
		controller : "home", // controller url.
		action     : "index",// action of funciton controller
		midellwell : _Midellwell.auth(), // is function run before route this.
		rule       : {"id" : "0-9+","member" : "A-Z,a-z"} // validate parameter passed from request url.
	}
);
_Route.add(
	{   name       : "home.demomodel", //unquie display name for url ex: (this.route("home.demomodel"))
		type       : "get",//put or post or get or all.
		url        : "/demomodel",//listening request.
		controller : "home", // controller url.
		action     : "demomodel",// action of funciton controller
		midellwell : _Midellwell.auth(), // is function run before route this.
		rule       : {"id" : "0-9+","member" : "A-Z,a-z"} // validate parameter passed from request url.
	}
);
//------------------------!add route------------------------

//------------------------group route------------------------

/*
	@parameter 1 ($admin is format string ) is url before all items child of this group. 

	@parameter 2 ($items is format object ) it is include information of route.

	@parameter 3 ($midellwell is format function ) it is run before route group.
*/

_Route.group("/admin",
	[
		{
			name       : "admin.home.index" ,//unquie display name for url ex: (this.route("admin.home.index"))
			type       : "get",//post or get or all.
			url        : "/home",//listening request.
			controller : "home", // controller url.
			action     : "index",// action of funciton controller
			midellwell : true, // is function run before route this.
			rule       : null // validate parameter passed from request url.
		}
		 
	],null
);


_Route.group("/auth",
	[
		{
			name       : "auth.signup",
			type       : "get",//post or get or all.
			url        : "/signup",//listening request.
			controller : "auth/signup", // controller url.
			action     : "index",// action of funciton controller
			midellwell : _Midellwell.auth(), // is function run before route this.
			rule       : null // validate parameter passed from request url.
		},
		{
			name       : "auth.signup",
			type       : "post",//post or get or all.
			url        : "/signup",//listening request.
			controller : "auth/signup", // controller url.
			action     : "save",// action of funciton controller
			midellwell : _Midellwell.auth(), // is function run before route this.
			rule       : null // validate parameter passed from request url.
		},
		{
			name       : "auth.signin",
			type       : "get",//post or get or all.
			url        : "/signin",//listening request.
			controller : "auth/signin", // controller url.
			action     : "index",// action of funciton controller
			midellwell : _Midellwell.auth(), // is function run before route this.
			rule       : null // validate parameter passed from request url.
		},
		{
			name       : "auth.signin",
			type       : "post",//post or get or all.
			url        : "/signin",//listening request.
			controller : "auth/signin", // controller url.
			action     : "save",// action of funciton controller
			midellwell : _Midellwell.auth(), // is function run before route this.
			rule       : null // validate parameter passed from request url.
		}
		 
	],null
);
//------------------------!group route------------------------