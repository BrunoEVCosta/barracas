var models= require('./../models');

module.exports = function(options){
	var call="setUserActiveState";
 	var attributes=options || {}; 
	return models[call](attributes)
}
