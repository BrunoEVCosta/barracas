var models= require('../barracas/models');
var rand = require('csprng')

module.exports = function(options){
	var call="createUser";
 	var attributes=options || {}; 
 	attributes.active=0;
	attributes.confirmationToken=rand(160,36)+rand(160,36)+rand(160,28)			
	return models[call](attributes)
}
