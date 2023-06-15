var models= require('../barracas/models');
const crypto = require('crypto');
const seed = require('../../config_barracas.js').seed
var rand = require('csprng')

module.exports = function(options){
 	var attributes=options || {}; 
 	attributes.where={id:attributes.id}
 	var call="getUser"
 	return new Promise(function(res,rej){
	 	models[call](attributes).then(function(data){
	 		createdOn=data.dataValues.createdOn
			const hash = crypto.createHash('sha256');
			hash.update(seed+attributes.password+createdOn);
			attributes.hash=hash.digest('hex')
			var call="setNewPassword";
			res(models[call](attributes))
	 	}).catch(function(err){
	 		rej(err)
	 	})
		

		
			
 		
 	})
}

