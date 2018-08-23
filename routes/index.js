var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fila/:numero',function(req, res, next){
	var fila = req.params.numero;
	var dados = require('./../components/barracas/controller/filaBarracas')(fila).then(function(dados){
			console.log(dados)
			var fila="Fila 1"

			res.render('esquemaFilaBarracas',{title: fila,dados:dados})
	})
})


//Change to post add time security and limit access to this.
router.get('/alugar/barraca/:id',function(req,res, next){
	var id=req.params.id
	var dados = require('./../components/barracas/controller/alugarBarracaDia')(id).then(function(dados){
			console.log(dados)
			var fila="Fila 1"

			res.json({})
	})	
})

module.exports = router;
