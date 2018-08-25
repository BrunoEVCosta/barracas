var models= require('./../models');

module.exports = function(transporter){
	var call="reportRents";
 	var attributes={};
 	attributes.where={data: {
 		"$between": getSurroundingDates()
 		}
 	} 	
	return models[call](attributes)
}


function getSurroundingDates(){
	var today=new Date()
	today.setHours("00")
	today.setMinutes("00")
	today.setSeconds("00")
	var tommorrow = new Date(today)
	tommorrow.setDate(tommorrow.getDate()+1)
	return [today,tommorrow]
}