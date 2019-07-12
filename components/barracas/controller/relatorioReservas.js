var models= require('./../models');

module.exports = function(transporter){
	var call="reportReserves";
 	var attributes={};
 	var year=transporter.ano
 	var queryMonth=thisMonth(transporter.mes)
 	var nextMonthSTR=nextMonth(transporter.mes)
 	attributes.where={
 		dataInicio: {
 			"$gt": `${year}-${queryMonth}-01`
 		},
 		dataFim: {
 			"$lt": `${year}-${nextMonthSTR}-01`
 		}
 	} 	

	return new Promise(function(res,rej){
		models[call](attributes).then(function(result){
			data=[]
			total=0
			for (i in result.rows){
				var row=result.rows[i];
				data.push(row.dataValues)
			}
			res({rows:data})
		}).catch(function(err){
			//Is empty an error????
			rej(err)
		})
	})
}

function thisMonth(thisMonth){
	return parseInt(thisMonth)>9 ? thisMonth+1 : `0${parseInt(thisMonth)}`
}
function nextMonth(thisMonth){
	thisMonth=parseInt(thisMonth)
	let nextMonth
	thisMonth>=9 ? nextMonth=thisMonth+1 : nextMonth=`0${thisMonth+1}`
	return nextMonth
}
