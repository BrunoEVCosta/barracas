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


m.rentTent=function(attributes){
	return db.Aluguer
	.create({
		barracaChapeusId: attributes.id,
		nome: '',
		valor: attributes.price,
		senha: '999999',
		lote: '999999',
		operadorId:'1',
	}).then(function(task){
		return task.dataValues.id 
	}).catch(function(err){
		console.log('Rent Tent - Err: '+ err);
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
		operadorId:'1',
	}).then(function(task){
		return task.dataValues.id 
	}).catch(function(err){
		console.log('Rent Tent - Err: '+ err);
		return err
	})
}

m.reportRents=function(attributes){
	return db.Aluguer
	.findAndCountAll({
		attributes:['valor','data',[Sequelize.fn('SUM', Sequelize.col('valor')),"Sum(valor)"]],
		group: 'valor',
		where: attributes.where
	}).then(function(res){
		console.log(res)
		return res
	}).catch(function(err){
		console.log('Get Row - Err: '+ err);
		return err;
	})
}

module.exports=m