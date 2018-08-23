var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fila/:numero',function(req, res, next){
	var dados = require('./../components/barracas/controller/filaBarracas')(1).then(function(dados){
			console.log(dados)
			var fila="Fila 1"

			res.render('esquemaFilaBarracas',{title: fila,dados:dados})
	})
})


router.get('/alugar/barraca/',function(req,res, next){
	var dados = require('./../components/barracas/controller/alugarBarracaDia')(1).then(function(dados){
			console.log(dados)
			var fila="Fila 1"

			res.json({})
	})	
})

module.exports = router;
