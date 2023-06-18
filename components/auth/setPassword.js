var models= require('../barracas/models');
const crypto = require('crypto');
const seed = require('../../config_barracas.js').seed
var rand = require('csprng')
const procedures=require('./procedures')
const {hashPassword} = require("./procedures");


module.exports = function(options){
 	var attributes=options || {}; 
 	attributes.where={id:attributes.id}
 	var call="getUser"
 	return new Promise(function(res,rej){
	 	models[call](attributes).then(async function(data){
	 		let createdOn=data.dataValues.createdOn
			//const hash = crypto.createHash('sha256');
			//hash.update(seed+attributes.password+createdOn);
			//attributes.hash=hash.digest('hex')

			let preSaltedPasswords=procedures.preSalt(attributes.password,{seed,createdOn})
			attributes.hash=await hashPassword(preSaltedPasswords)
			if (attributes.hash instanceof Error) throw attributes.hash

			var call="setNewPassword";
			res(models[call](attributes))
	 	}).catch(function(err){
	 		rej(err)
	 	})
		

		
			
 		
 	})
}

