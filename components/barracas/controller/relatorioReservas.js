var models= require('./../models');
module.exports = function(transporter){
	var call="reportReserves";
 	var attributes={};
 	var year=transporter.ano
 	var queryMonth=thisMonth(transporter.mes)
 	var nextMonthSTR=nextMonth(transporter.mes)
 	queryMonth=="00" ? nextMonthSTR="12" : null
 	queryMonth=="00" ? queryMonth="01" : null
 	attributes.where={
 		dataInicio: {
 			"$lte": `${year}-${nextMonthSTR}-01`
 		},
 		dataFim: {
 			"$gte": `${year}-${queryMonth}-01`
 		}
 	} 	
 	transporter.espacoId != null ? attributes.where.barracaChapeusId = transporter.espacoId : null
	return new Promise(function(res,rej){
		models[call](attributes).then(function(result){
			data=[]
			total=0
			result.rows.forEach(function(row){
				Object.assign(row.dataValues, row.dataValues.BarracasChapeu.dataValues)
				delete row.dataValues.id
				delete row.dataValues.barracaChapeusId
				row.dataValues.operadorId=row.dataValues.Pessoa.nome
				delete row.dataValues.Pessoa
				delete row.dataValues.BarracasChapeu
				row.dataValues.dataInicio= new Date(row.dataValues.dataInicio).toLocaleDateString("ko-KR",{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/. /g,"-").replace(".","")
				row.dataValues.dataFim= new Date(row.dataValues.dataFim).toLocaleDateString("ko-KR",{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/. /g,"-").replace(".","")
				row.dataValues.registo=row.dataValues.registo.toUTCString()
				data.push({
					"#":row.dataValues.numero,
					tipo:row.dataValues.tipo,
					subTipo:row.dataValues.subTipo,
					fila:row.dataValues.localizacao,
					nome:row.dataValues.nome,
					inicio:row.dataValues.dataInicio,
					fim:row.dataValues.dataFim,
					valor:row.dataValues.valor,
					operador:row.dataValues.operadorId,
					registo:row.dataValues.registo
				})
			})
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
