var models= require('./../models');

module.exports = function(options){
	var call="getReserve";
 	var attributes=options || {};
 	attributes.where={id: attributes.id} 	
	return models[call](attributes)
}