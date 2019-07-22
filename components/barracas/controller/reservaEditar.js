var models= require('./../models');

module.exports = function(transporter){
	var call="reserveEdit";
 	var attributes=transporter;
	return models[call](attributes)
}