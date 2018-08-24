var models= require('./../models');

module.exports = function(transporter){
	var call="reserveTent";
 	var attributes=transporter;
	return models[call](attributes)
}