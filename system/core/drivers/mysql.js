function driverMysql($SeverInfo){
    const _mysql      = require('mysql');
	const _connection = _mysql.createConnection($SeverInfo);
	this._table       = null;
	this._columns     = [];
    this._joins       = [];
    this._order       = [];
    this._where       = [];
    this._group       = [];
    this._limit       = [];
    this._sql         = "";
	const init = function(){
		try{
		_connection.connect(function($err) {
			if ($err) {
					_Controller.info.error.push({detail:$err ,message : $err.stack});
				}
			});
		}catch(e){
			if (e instanceof SyntaxError)  _Controller.info.error.push({detail:e ,message : e.message});
			else  _Controller.info.error.push({detail:e ,message : e}); 
		}
	}
	this.from = function($table = null){
		var argTable    = $table.split(" ");
		argTable        = cleanEmtyItemArray(argTable,"");
		var newargTable = [];
		for (var i in argTable){
			newargTable.push(replacecolum(argTable[i]));
		}
		this._table = newargTable.join(" ");
	}
	this.select = function($data = []){
		var selectString ;
		if(typeof $data == "object"){
			for (var i in $data){
				selectString = replacecolum($data[i]);
				this._columns.push(selectString);
			}
			return this;
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to select must be an object"});
			return false;
		}
	}
	this.join = function ($data = {}){
		var joinType = ["INNER","LEFT","RIGHT"];
		var table = replacecolum($data.table);
		var on = (typeof $data.on == "object") ? $data.on : null;
		var and = (typeof $data.and == "object") ? $data.and : null;
		var stringOn = "";
		var argOn    = [];
		var argAnd   = [];
		argOn.push(replacecolum(on[0]));
		argOn.push(replacecolum(on[1]));
		argOn.push(replacecolum(on[2]));
		var newAnd  = [];
		var fixAnd  = "";
		if(and != null){
			fixAnd = " AND ";
			for(var i in and){
				argAnd.push(replacecolum(and[i][0]));
				argAnd.push(replacecolum(and[i][1]));
				argAnd.push(replacevalue(and[i][2]));
				newAnd.push(argAnd.join(" "));
				argAnd = [];
			}
		}
		var stringjoin = joinType[$data.type] + " JOIN "+table+" ON " + argOn.join(" ") + fixAnd + newAnd.join(" AND ");
		this._joins.push(stringjoin);
	}
	this.where = function($data = null){
		var argAnd   = [];
		var newAnd  = [];
		if($data != null){
			argAnd.push(replacecolum($data[0]));
			argAnd.push(replacecolum($data[1]));
			argAnd.push(replacevalue($data[2]));
		}
		var stringwhere = argAnd.join(" ");
		this._where.push(stringwhere);
	}
	this.wherein = function($data = null){
		var key      = replacecolum($data.key);
		var dataIn   = $data.in;
		var argIn    = [];
		for (var i in dataIn ){
			argIn.push(replacevalue(dataIn[i]))
		}
		var stringwhere = key + " IN ( " + argIn.join(" , ") +" ) ";
		this._where.push(stringwhere);
	}
	this.wherenotin = function($data = null){
		var key      = replacecolum($data.key);
		var dataIn   = $data.in;
		var argIn    = [];
		for (var i in dataIn ){
			argIn.push(replacevalue(dataIn[i]))
		}
		var stringwhere = key + " NOT IN ( " + argIn.join(" , ") +" ) ";
		this._where.push(stringwhere);
	}
	this.limit = function($limit = null){
	    this._limit = $limit;
	}
	this.orderby = function($data = {}){
		var key,value,stringorder;
		for (var i in $data){
			key = replacecolum(i);
			value = $data[i];
			this._order.push(key + " " + value)
		}
	}
	this.groupby = function($data = []){
		for (var i in $data){
			key = replacecolum($data[i]);
			this._group.push(key);
		}
	}
	this.get = function($model, $type = 0,$connect = true){
		if($model.table != null){
			this.from($model.table);
			this.select($model._selects);
			if($model._joins.length > 0){
				for(var i in $model._joins){
					this.join($model._joins[i]);
				}
			}
			if($model._where.length > 0){
				for(var i in $model._where){
					this.where($model._where[i]);
				}
			}
			if($model._wherein.length > 0){
				for(var i in $model._wherein){
					this.wherein($model._wherein[i]);
				}
			}
			if($model._wherenotin.length > 0){
				for(var i in $model._wherenotin){
					this.wherenotin($model._wherenotin[i]);
				}
			}
			if($model._order.length > 0){
				for(var i in $model._order){
					this.orderby($model._order[i]);
				}
			}
			if($model._group.length > 0){
				for(var i in $model._group){
					this.groupby($model._group[i]);
				}
			}
			if($model._limit.length > 0){
				this.limit($model._limit);
			}
			this._sql   = this.convertSql(0);
			$model._sql = this._sql;
			if($connect == true){
				try { 
					var options = {sql : this._sql, nesttables: false};
					_connection.query(options,function(err, rows, fields){
						if (err) 
							_Controller.info.error.push({detail:err ,message : err.sqlMessage});
						else
							if($type == 0){
								if(rows.length > 0 ){
									var row = rows[0];
									for (var i in row){
										$model[i] = row[i];
									}
								}
								if(typeof $model._callback == "function"){
									$model.toList(null);
									$model._callback($model._callback = null);
								}
							}else{
								var argModels = [];
								for (var i in rows){
									var row = rows[i];
									var dataModel = new Object;
									for (var i in $model){
										dataModel[i] = $model[i];
									}
									for (var i in row){
										dataModel[i] = row[i];
									}
									dataModel.reset();
									argModels.push(dataModel);
								}	
								if(typeof $model._callback == "function"){
									$model._callback($model.toList(argModels));
								}
							}
								
						_Controller.endwait();
					});
				}catch (e){
					if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
					else _Controller.info.error.push({detail:e ,message : e});
					_Controller.endwait();
				}
			}
		} 
	}
	this.save = function($model){
		var options = {sql : "DESCRIBE " + replacecolum($model.table), nesttables: false};
		_connection.query(options,function(err, rows, fields){
			if(err == null){
				var dataColumns = [];
				for ( var i in rows){
					dataColumns.push(rows[i]["Field"]);
				}
				var  dataChange = {};
				for( var i in dataColumns){
					if(dataColumns[i] != $model.key){
						if(typeof $model[dataColumns[i]] !== "undefined"){
							dataChange[dataColumns[i]] = $model[dataColumns[i]];
						}else{
							$model[dataColumns[i]] = null;
						}
					}
				}
				if($model[$model.key] == 0){
					var argcolum = []; 
					var argvalue = [];
					for(var i in dataChange){
						if(typeof(i) === "string"){
							argcolum.push(replacecolum(i));
							argvalue.push(replacevalue(dataChange [i]));
						}	
					}
					var stringColum = argcolum.join(" , ");
					var stringValue = argvalue.join(" , ");
					this._sql  = 'INSERT INTO '+ replacecolum($model.table) + " ( " + stringColum + " ) VALUE ( "+ stringValue + " )";
				}else{
					var argUpdate = []; 
					var keyString = "";
					for(var i in dataChange){
						if(typeof(i) === "string"){
							keyString = i
							argUpdate.push(replacecolum(i) + " = " +replacevalue(dataChange[i]));
						}	
					} 
				    this._sql = "UPDATE "+ replacecolum($model.table)+ " SET " + argUpdate.join(" , ") + " WHERE " + replacecolum($model.key) + " = " +$model[$model.key];
				}
				_connection.query(this._sql, function(err, result) {
				  	if (err) {
						_Controller.info.error.push({detail:err ,message : err.sqlMessage});
				  	}
				  	if($model[$model.key] == 0){
				  		$model[$model.key] = result.insertId; 
				  	}
					if(typeof $model._callback == "function"){
						$model._callback($model._callback = null);
					}
				});
			}	
		});
	}
	this.find = function ($model,$id){
		this._sql = "SELECT * FROM " + replacecolum($model.table) + " WHERE " + replacecolum($model.key) +" = " + $id + " LIMIT 0,1";
		var options = {sql : this._sql, nesttables: false};
		_connection.query(options,function(err, rows){
			if (err) {
				_Controller.info.error.push({detail:err ,message : err.sqlMessage});
		  	}else{
		  		var row = null;
		  		if(rows.length > 0 ){
					row = rows[0];
					for (var i in row){
						$model[i] = row[i];
					}
				}
			    if(typeof $model._callback !== null){
					$model._callback($model._callback = null);
				}
		  	}
		});
	}
	this.destroy = function($model){
		if($model[$model.key] != 0){
			this._sql = "DELETE FROM " + replacecolum($model.table) + " WHERE " + replacecolum($model.key) +" = " + $model[$model.key];
		}else{
			if($model._where.length > 0){
				for(var i in $model._where){
					this.where($model._where[i]);
				}
			}
			if($model._wherein.length > 0){
				for(var i in $model._wherein){
					this.wherein($model._wherein[i]);
				}
			}
			if($model._wherenotin.length > 0){
				for(var i in $model._wherenotin){
					this.wherenotin($model._wherenotin[i]);
				}
			}
			var where = this.convertSql(1);
			this._sql = "DELETE FROM " + replacecolum($model.table) + where;
		}
		var options = {sql : this._sql, nesttables: false};
		_connection.query(options,function(err, rows){
			if (err) {
				_Controller.info.error.push({detail:err ,message : err.sqlMessage});
		  	}else{
			    if(typeof $model._callback  == "function"){
					$model._callback($model._callback = null);
				}
		  	}	
		});
	}
	this.convertSql = function(type){
		var selectString = joinString = stringWhere = groupString = orderString = limitString = "";
		if(this._columns == null || this._columns.length < 1){
			this._columns.push("*");
		}
		selectString = this._columns.join(" , ");
		if(this._joins.length > 0){
			joinString = " " + this._joins.join(" ");
		}
		if(this._where.length > 0){
			stringWhere = " WHERE " + this._where.join(" AND ") ;
		}
		if(this._group.length > 0){
			groupString = " GROUP BY " + this._group.join(" , ");
		}
		if(this._order.length > 0){
			orderString = " ORDER BY " + this._order.join(" , ");
		}
		if(this._limit.length > 0){
			limitString = " LIMIT " + this._limit.join(" , ");
		}
		if(type == 0){
			var sql = "SELECT " + selectString + " FROM " + this._table + joinString + stringWhere + groupString + orderString + limitString;
		}
		if(type == 1){
			var sql = stringWhere;
		}
		return sql;
	}
	const replacecolum  = function($column = null){
		const _sqlKeyWord  = ["%","=","*","/","+","-","like","in","not","or","on","and","left","end","as","right","inner"];
		var argString = $column.split(" ");
		argString     = cleanEmtyItemArray(argString);
		var keyString = "";
		var argNew    = [];
		var columString = "";
		for (var i in argString){
			columString = argString[i];
			if(_sqlKeyWord.indexOf(argString[i].toLowerCase().trim()) == -1){
				columString  = columString.ReplaceAll("```","`");
				columString  = columString.ReplaceAll("[","`");
				columString  = columString.ReplaceAll("]","`");
				columString  = columString.ReplaceAll("``","`");
				columString  = "`"+columString+"`";
				columString  = columString.ReplaceAll(".","`.`");
			}
			argNew.push(columString);
		}
		return 	argNew.join(" ");
	}
	const replacevalue = function($value = null){
		var valueString
		if($value == null) return "NULL";
		if(typeof $value == "string"){
		 	valueString = ("'"+$value+"'");
		}
		else
			valueString = ($value);
		return 	valueString;
	}
	init();
}
module.exports = driverMysql;
