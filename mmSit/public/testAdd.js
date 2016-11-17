/**
 * 定义一个函数
 */
function add(){
	this.show = function(a,b){
		console.log(a+b);
		return a+b;
	};
	this.a = "a属性";
}

var main = {
	a:'111',
	b:add,
}
exports = exports;