var models= require('./../models');
const crypto = require('crypto');
const seed = require('./../../../config_barracas.js').seed
var rand = require('csprng')

module.exports = function(options,callBack){
	return new Promise(function(resolve,reject){ 
		var call="getUser";
	 	var attributes=options || {};
	 	attributes.where={email: attributes.email} 	
		
	 	models[call](attributes).then(function(res){
	 		var data=res.dataValues
	 		var id = data.id
	 		var name = data.nome
	 		var storedHash = data.hash
	 		var createOn = data.createOn
	 		var attempt = data.attempt
			
	 		attributes.id=id
	 		attributes.valid=1
	 		attributes.accessToken=rand(160,36)+rand(160,36)

			const hash = crypto.createHash('sha256');
			hash.update(seed+attributes.password+createOn);

			const calculatedHash=hash.digest('hex')
	 		if ( calculatedHash  === storedHash){
	 			models['resetLoginAttempt'](attributes)
	 			models['createAccess'](attributes).then(function(accessId){
		 			callBack(name,accessId,id,attributes.accessToken)
		 			resolve({
		 				name:name,
		 				access:"granted",
		 				accessToken: attributes.accessToken
		 			})	 				
	 			}).catch(function(err){
	 				console.log("Err increment" +err)
	 				reject({
		 				access:err,
		 				attempt:attempt
		 			})
	 			})
	 		}else{
	 			models['incrementLoginAttempt'](attributes).then(function(incRes){
		 			reject({
		 				access:"denied",
		 				attempt:incRes.dataValues.attempt
		 			})	
	 			}).catch(function(err){
	 				console.log("Err increment" +err)
	 				reject({
		 				access:err,
		 				attempt:attempt
		 			})
	 			})
	 		}	
	 	}).catch(function(err){
	 		console.log("Err main" +err)
	 		reject({
		 		access:err,
		 		attempt:''
		 	})
	 	})
 	})	 
}