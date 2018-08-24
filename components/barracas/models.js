var db = require('./../sqldb');

//Break up this file into domains once it gets to big.
var m={}

m.getRow=function(attributes){
	return db.BarracasChapeus
	.findAndCountAll({
		include: [{
			model: db.Aluguer
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
	return db.Reserva
	.create({
		barracaChapeusId: attributes.id,
		nome: '',
		dataInicio: '',
		dataFim: '',
		valor: attributes.price,
		operadorId:'1',
	}).then(function(task){
		return task.dataValues.id 
	}).catch(function(err){
		console.log('Rent Tent - Err: '+ err);
		return err
	})
}

module.exports=m