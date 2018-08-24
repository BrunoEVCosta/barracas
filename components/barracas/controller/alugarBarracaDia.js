var models= require('./../models');

module.exports = function(transporter){
	var call="rentTent";
 	var attributes=transporter;
	return models[call](attributes)
}