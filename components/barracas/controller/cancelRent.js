var models= require('./../models');

module.exports = function(options){
	var call="cancelRent";
 	var attributes=options || {};
 	attributes.where={id: attributes.id} 	
	return models[call](attributes)
}