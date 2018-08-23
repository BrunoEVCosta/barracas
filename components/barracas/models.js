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
		console.log(res)
		return res
	}).catch(function(err){
		console.log('Get Row - Err: '+ err);
		return err;
	})
}


m.rentTent=function(attributes){
	return db.Aluguer
	.create({
		barracaChapeusId: 2,
		nome: '',
		valor: '8.00',
		senha: '999999',
		lote: '999999',
		operadorId:'1',
	}
	)
}


module.exports=m