var M = function(){

	this.average = function(delegate, object_array){
		if(this.array != undefined)
		{
			object_array = this.array;
		}
		var sumOf = this.summmation(delegate, object_array);
		var avg = sumOf.sum / object_array.length;
		this.avg = avg;
		return this.avg;
	},

	this.stdDev = function(delegate, object_array){
		if(this.array != undefined)
		{
			object_array = this.array;
		}
		var avgOne = this.average(delegate, object_array);
		var avgValOne = avgOne;
		var i = 0;
		var sum = 0;
		var squaredArray = [];
		for( i; i < object_array.length; i++){
			delRes = delegate(object_array[i]);
			squaredArray.push({ p : Math.pow(delRes, 2)});
		}
		var avgTwo = this.average(function(object){
			return object.p;
		}, squaredArray);
		var sq = Math.pow(avgValOne, 2);
		var subtraction = avgTwo - sq;
		this.stdDev = Math.sqrt(subtraction);
		return this;
	},

	this.summmation = function(delegate, object_array){
		if(this.array != undefined)
		{
			object_array = this.array;
		}
		var i = 0;
		var sum = 0;
		for( i; i < object_array.length; i++){
			sum = sum + delegate(object_array[i]);
		}
		this.sum = sum;
		return this;
	},

	this.groupBy = function(delegate, object_array){
		if(this.array != undefined)
		{
			object_array = this.array;
		}
		var groups = {};
		var i = 0;
		for( i; i < object_array.length; i++){
			var key = delegate(object_array[i]);
			if( key in groups){
				groups[key].push(object_array[i]);
			}
			else{
				groups[key] = [];
				groups[key].push(object_array[i]);
			}
		}
		this.groups = groups ;
		return this;
	},

	this.select = function(delegate, object_array){
		if(this.array != undefined)
		{
			object_array = this.array;
		}
		var array = [];
		var i = 0;
		for( i; i < object_array.length; i++){
			array.push(delegate(object_array[i]));
		}
		this.array = array;
		return this;
	},

	this.where = function(delegate, object_array){
		if(this.array != undefined)
		{
			object_array = this.array;
		}
		var array = [];
		var i = 0;
		for(i; i < object_array.length; i++){
			if(delegate(object_array[i]) === true){
				array.push(object_array[i]);
			}
		}
		this.array = array;
		return this;
	},

	M.count = function(){

	}
}

var calc = new M();

var data = [{ p : 1, t:1 }, { p : 2, t:1 }, { p : 3, t:2}, { p : 4, t:2}];
var data2 = [{ p : 1, t:1 }, { p : 2, t:1 }, { p : 3, t:2}];
var res = calc.select(function(object){
	return object.p;
}, data).where(function(object){
	return object > 2;
});

var calc2 = new M();
var res2 = calc2.groupBy(function(object){
	return object.t;
}, data);

var calc3 = new M();
var res3 = calc3.summmation(function(object){
	return object.p;
}, data);

var calc4 = new M();
var res4 = calc4.average(function(object){
	return object.p;
}, data2);

var calc5 = new M();
var res5 = calc5.stdDev(function(object){
	return object.p;
}, data2);

//console.log(res);
//console.log(res2);
//console.log(res3);
//console.log(res4);
console.log(res5);
