function MyController (){
	this.data = {};
	this.construct = function(){
		this.data.abc = 1;
		this.validate.addmessge({
			email    : "Vui lòng nhập {$1} là email",
			number   : "Hãy nhập {$1} là số",
			required : "Hãy nhập {$1} không được rổng",
			mintext  : "Vui lòng nhập {$1} ít nhất {$2} ký tự",
			maxtext  : "Vui lòng nhập {$1} tối đa {$2} ký tự",
			date     : "Hãy nhập {$1} là ngày",
			mindate  : "Hãy nhập {$1} ít nhất {$2} ngày",
			maxdate  : "Hãy nhập {$1} tối đa {$2} ngày",
			minnumber: "Vui lòng nhập {$1} lớn hơn {$2}",
			maxnumber: "Hãy nhập {$1} ít hơn {$2}",
			same     : "Hãy nhập {$1} giống như {$2}",
			phone    : "Hãy nhập {$1} là số điện thoại",
			url      : "Hãy nhập {$1} một url",
		});
	}
}
module.exports = MyController;