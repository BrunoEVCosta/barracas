var models= require('../barracas/models');

module.exports = function(options){
	var call="getUsers";
 	var attributes=options || {};
 	attributes.where={} 	
	return new Promise(function(res,rej){
		models[call](attributes).then(function(result){
			data=[]
			try{
				for (i in result){
					var row=result[i].dataValues
					data.push({
						userId: row.id,
						name:row.nome,
						active: row.active,
						permission: row.permissao
					})
				}				
				res(data)
			}catch(err){
				rej(err)
			}
		})
		
	})
}