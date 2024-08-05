var models= require('../barracas/models');
const crypto = require('crypto');
const seed = require('../../config_barracas.js').seed
var rand = require('csprng')
const bcrypt=require('bcrypt')
const procedures=require("./procedures")



module.exports = function(options,callBack){
	return new Promise(function(resolve,reject){ 
		var call="getUser";
	 	var attributes=options || {};
	 	attributes.where={email: attributes.email} 	
		
	 	models[call](attributes).then(async function(res){
			let data=res.dataValues
	 		let id = data.id
	 		let name = data.nome
	 		let storedHash = data.hash
	 		let createdOn = data.createdOn
	 		let attempt = data.attempt
			
	 		attributes.id=id
	 		attributes.valid=1
	 		attributes.accessToken=rand(160,36)+rand(160,36);

			//const hash = crypto.createHash('sha256');
			//hash.update(seed+attributes.password+createdOn);
			//const calculatedHash=hash.digest('hex')
			let validPassword=await procedures.validatePassword(attributes.password,{seed,createdOn,storedHash})
	 		if ( validPassword === true && data.active){
	 			models['resetLoginAttempt'](attributes)
	 			models['createAccess'](attributes).then(function(accessId){
		 			callBack(name,accessId,id,attributes.accessToken)
		 			resolve({
		 				name:name,
		 				access:"granted",
		 				accessToken: attributes.accessToken
		 			})	 				
	 			}).catch(function(err){
					err.cause="Erro do sistema"
	 				console.log("Err increment" +err)
	 				reject({
		 				access:err,
		 				attempt:attempt++
		 			})
	 			})
	 		}else{
	 			models['incrementLoginAttempt'](attributes).then(function(incRes){
		 			reject({
		 				access:{cause:"Palavra passe incorrecta"},
		 				attempt:incRes.dataValues.attempt++
		 			})	
	 			}).catch(function(err){
					err.cause="Palavra passe incorrecta"
					console.log("Err increment" +err)
	 				reject({
		 				access:err,
		 				attempt:attempt++
		 			})
	 			})
	 		}	
	 	}).catch(function(err){
	 		console.log("Err main" +err)
			err.cause="Dados incorrectos"
	 		reject({
		 		access:err,
		 		attempt:'∞'
		 	})
	 	})
 	})	 
}