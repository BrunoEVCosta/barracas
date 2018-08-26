var db = require('./../sqldb');
var Sequelize = require('sequelize');

//Break up this file into domains once it gets to big.
var m={}

m.getRow=function(attributes){
	return db.BarracasChapeus
	.findAndCountAll({
		include: [{
			model: db.Aluguer
		},{
			model: db.Reservas
		}],
		where: attributes.where

	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Get Row - Err: '+ err);
		return err;
	})
}

m.getReserve=function(attributes){
	return db.Reservas
	.findAndCountAll({
		where: attributes.where
	}).then(function(res){
		return res.rows[0].dataValues
	}).catch(function(err){
		console.log('Get reserve - Err: '+ err);
		return err;
	})
}

m.getRent=function(attributes){
	return db.Aluguer
	.findAndCountAll({
		where: attributes.where
	}).then(function(res){
		return res.rows[0].dataValues
	}).catch(function(err){
		console.log('Get reserve - Err: '+ err);
		return err;
	})
}

m.rentTent=function(attributes){
	return db.Aluguer
	.create({
		barracaChapeusId: attributes.id,
		nome: '',
		valor: attributes.price,
		senha: '999999',
		lote: '999999',
		operadorId:attributes.userId,
	}).then(function(task){
		return task.dataValues.id 
	}).catch(function(err){
		console.log('Rent Tent - Err: '+ err);
		return err
	})
}

m.cancelRent=function(attributes){
	return db.Aluguer
	.destroy({
		where: attributes.where,
	}).then(function(task){
		return task 
	}).catch(function(err){
		console.log('Kill Rent Tent - Err: '+ err);
		return err
	})
}

m.reserveTent=function(attributes){
	return db.Reservas
	.create({
		barracaChapeusId: attributes.id,
		nome: attributes.name,
		dataInicio: attributes.startDate,
		dataFim: attributes.endDate,
		valor: attributes.price,
		operadorId: attributes.userId,
	}).then(function(task){
		return task.dataValues.id 
	}).catch(function(err){
		console.log('Reserve Tent - Err: '+ err);
		return err
	})
}




m.reportRents=function(attributes){
	return db.Aluguer
	.findAndCountAll({
		attributes:['valor',[Sequelize.fn('SUM', Sequelize.col('valor')),"sum"]],
		group: 'valor',
		where: attributes.where
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Report Rents - Err: '+ err);
		return err;
	})
}

m.getUser=function(attributes){
	return db.Pessoas
	.find({
		where: attributes.where
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Get User id - Err: '+ err);
		return err;
	})
}

m.getAccessToken=function(attributes){
	return db.Acesso
	.find({
		attributes: ['accessToken','valid'],
		where: attributes.where
	}).then(function(res){
		return res.dataValues
	}).catch(function(err){
		console.log('Get user hash - Err: '+ err);
		return err;
	})
}

m.incrementLoginAttempt=function(attributes){
	return db.Pessoas
	.findById(attributes.id).then(function(pessoas){
		return pessoas.increment('attempt', {by:1})
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('IncrementLoginAttempt - Err: '+ err);
		return err;
	})
}

m.resetLoginAttempt=function(attributes){
	return db.Pessoas
	.findById(attributes.id).then(function(pessoas){
		return pessoas.update({attempt:0})
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Reset Login Attempt - Err: '+ err);
		return err;
	})
}

m.createUser=function(attributes){
	return db.Pessoas
	.create({
		nome: attributes.name,
		permissao: attributes.permission,
		hash: attributes.hash,
		confirmationToken: attributes.confirmationToken,
		active: attributes.active
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Create user - Err: '+ err);
		return err;
	})
}

m.createAccess=function(attributes){
	return db.Acesso
	.create({
		pessoasId: attributes.id,
		ip: attributes.ip,
		platform: attributes.platform,
		valid: attributes.valid,
		accessToken: attributes.accessToken
	}).then(function(res){
		return res.dataValues.id
	}).catch(function(err){
		console.log('Create access - Err: '+ err);
		return err;
	})
}

m.getAccesses=function(attributes){	
	return db.Acesso
	.findAll({
		include:[{model:db.Pessoas}],
		where: attributes.where
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Get User id - Err: '+ err);
		return err;
	})
}

m.getUsers=function(attributes){	
	return db.Pessoas
	.findAll({
		where: attributes.where
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Get User id - Err: '+ err);
		return err;
	})
}

m.revokeAccessToken=function(attributes){	
	return db.Acesso
	.findById(attributes.id).then(function(acesso){
		return acesso.update({valid:0})
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Revoke Access - Err: '+ err);
		return err;
	})
}

module.exports=m