var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fila/:numero',function(req, res, next){
	var fila = req.params.numero;
	var dados = require('./../components/barracas/controller/filaBarracas')(fila).then(function(dados){
			var title="Fila "+fila
			res.render('esquemaFilaBarracas',{title: title,dados:dados})
	})
})


router.get('/relatorios/aluguer/hoje',function(req, res, next){
	var dados = require('./../components/barracas/controller/relatorioAluguers')().then(function(dados){
			res.json(dados)
	})
})

router.get('/vista-geral',function(req, res, next){
	res.render('vistaGeral',{})
})

//Change to post add time security and limit access to this.
router.get('/alugar/barraca/:id',function(req,res, next){
	var id=req.params.id
	var price=req.query.price
	transporter={
		id:id,
		price:price
	}
	console.log(transporter)
	var dados = require('./../components/barracas/controller/alugarBarracaDia')(transporter).then(function(id){
			console.log(id)
			var fila="Fila 1"

			res.status(200).json({id:id})
	}).catch(function(err){
		res.status(404).json(err)
	})	
})

//Change to post add time security and limit access to this.
router.get('/reservar/barraca/:id',function(req,res, next){
	var id=req.params.id
	var price=req.query.price
	var startDate=req.query.startDate
	var endDate=req.query.endDate
	var name=req.query.name
	transporter={
		id:id,
		price:price,
		startDate:startDate,
		endDate:endDate,
		name:name
	}
	console.log(transporter)
	var dados = require('./../components/barracas/controller/reservarBarraca')(transporter).then(function(id){
			console.log(id)
			var fila="Fila 1"

			res.status(200).json({id:id})
	}).catch(function(err){
		res.status(404).json(err)
	})	
})

module.exports = router;
