var models= require('./../models');

module.exports = function(d){
	var call="rentTent";
 	var attributes=''
	models[call](attributes).then(function(res){
		console.log(res);
	})
}