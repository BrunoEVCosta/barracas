var models= require('./../models');

module.exports = function(transporter){
	var call="reportRents";
 	var attributes={};
 	attributes.where={data: {
 		"$between": getSurroundingDates()
 		}
 	} 	
	return new Promise(function(res,rej){
		models[call](attributes).then(function(result){
			data=[]
			total=0
			for (i in result.rows){
				var row=result.rows[i];
				data.push(row.dataValues)
				total+=row.dataValues.sum
			}
			res({rows:data,total:total})
		}).catch(function(err){
			//Is empty an error????
			rej(err)
		})
	})
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