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
		nome: attributes.nome,
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
		inicio: attributes.startDate,
		fim: attributes.endDate,
		valor: attributes.price,
		operadorId: attributes.userId,
	}).then(function(task){
		return task.dataValues.id 
	}).catch(function(err){
		console.log('Reserve Tent - Err: '+ err);
		return err
	})
}

m.reserveEdit=function(attributes){
	return db.ReservasEdicoes
	.create({
		nome: attributes.nome,
		reservaId: attributes.id,
		inicio: attributes.inicio,
		fim: attributes.fim,
		valor: attributes.valor,
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
		attributes:[
			'valor',
			[Sequelize.fn('SUM', Sequelize.col('valor')), "sum"],
			[Sequelize.fn('COUNT', Sequelize.col('valor')), "quantidade"]
		],
		group: 'valor',
		where: attributes.where
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Report Rents - Err: '+ err);
		return err;
	})
}

m.reportReserves=function(attributes){
	return db.Reservas
	.findAndCountAll({
		include:[{
			model:db.BarracasChapeus
		},{
			model:db.Pessoas
		},{
			model:db.ReservasEdicoes
		}],
		order:[['BarracaChapeusId','DESC']],
		where: attributes.where
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Report Reserves - Err: '+ err);
		return err;
	})
}

m.getUser=function(attributes){
	return db.Pessoas
	.findOne({
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
	.findOne({
		attributes: ['accessToken','valid'],
		include: [{model: db.Pessoas }],
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
	.findByPk(attributes.id).then(function(pessoas){
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
	.findByPk(attributes.id).then(function(pessoas){
		return pessoas.update({attempt:0})
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Reset Login Attempt - Err: '+ err);
		return err;
	})
}

m.setNewPassword=function(attributes){
	return db.Pessoas
	.findByPk(attributes.id).then(function(pessoas){
		return pessoas.update({hash:attributes.hash})
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Set new password: '+ err);
		return err;
	})
}

m.setUserActiveState=function(attributes){
	return db.Pessoas
	.findByPk(attributes.id).then(function(pessoas){
		return pessoas.update({active:attributes.active})
	}).then(function(res){
		return res
	}).catch(function(err){
		console.log('Set active state: '+ err);
		return err;
	})
}

m.createUser=function(attributes){
	return db.Pessoas
	.create({
		nome: attributes.name,
		email: attributes.email,
		permissao: attributes.permission,
		confirmationToken: attributes.confirmationToken,
		active: false,
		//Password starter must be changed, plus user is not active on create
		hash: "jkljlkjkljljljlkjlkjlkj"

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
		country:attributes.country,
		city:attributes.city,
		isp:attributes.isp,
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
	if(attributes.id){
		return db.Acesso
			.findByPk(attributes.id).then(function(acesso){
				return acesso.update({valid:0,revokedOn:new Date()})
			}).then(function(res){
				return res
			}).catch(function(err){
				console.log('Revoke Access - Err: '+ err);
				return err;
			})
	}else if(attributes.accessToken){
		return db.Acesso
			.findOne({where:{accessToken:attributes.accessToken}}).then(function(acesso){
				return acesso.update({valid:0})
			}).then(function(res){
				return res
			}).catch(function(err){
				console.log('Revoke Access - Err: '+ err);
				return err;
			})
	}else{
		return new Promise((res,rej)=>{
			rej(new Error("NoInformationSent"))
		})
	}

}

module.exports=m