var models= require('./../models');

module.exports = function(options){
	var call="getAccesses";
 	var attributes=options || {};
 	attributes.where={valid: 1} 	
	return new Promise(function(res,rej){
		models[call](attributes).then(function(result){
			data=[]
			try{
				for (i in result){
					var row=result[i].dataValues
					data.push({
						name:row.Pessoa.dataValues.nome,
						ip:row.ip,
						platform:row.platform,
						accessId: row.id
					})
				}				
				res(data)
			}catch(err){
				rej(err)
			}
		})
		
	})
}