var models= require('./../models');

module.exports = function(transporter){
	var call="reserveEditar";
 	var attributes=transporter;
	return models[call](attributes)
}