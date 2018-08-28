var express = require('express');
var router = express.Router();

var Cookies = require('cookies');
var Keygrip = require("keygrip");
var keylist=["SEKRIT2", "SEKRIT1"]; //Set a list of o keys.
var keys = new Keygrip(keylist,'sha256','hex')


function loggedIn(req,res,next){
	var cookies = new Cookies( req, res, { "keys": keys } ), unsigned, signed, tampered;
	var attributes={}
	attributes.id=req.cookies.accessId
	require('./../components/barracas/controller/getAccessTokenById')(attributes).then(function(access){
		//verify sig
		if(req.cookies.accessToken === access.accessToken && access.valid)
			next()
		else
			//if "/" this else redirect to it
			res.render('index', { title: 'Gestão de barracas'});
	}).catch(function(err){
			res.render('index', { title: 'Gestão de barracas'});
	})
}

function getScrope(req,res){
	var cookies = new Cookies( req, res, { "keys": keys } ), unsigned, signed, tampered;
	var attributes={}
	attributes.id=req.cookies.accessId
	return new Promise(function(res,rej){
		require('./../components/barracas/controller/getAccessTokenById')(attributes).then(function(access){
			res(access.Pessoa.dataValues.permissao)
		}).catch(function(err){
			rej(err)
		})	
	})
}

function isAdmin(req,res,next){
	getScrope(req,res).then(function(scope){
		//Assert??
		if(scope === "admin"){
			next();
		}else{
			res.redirect('/');
		}
	}).catch(function(err){
		console.log("Error getting scope "+ err);
		res.redirect('/');
	})
}

function getCookieData(req){
	var cookies=req.cookies
	var result={
		name: cookies.name,
		accessId: cookies.accessId 
	}
	return result;
}

// USER LAND

/* GET home page. */
router.get('/admin', loggedIn, isAdmin, function(req, res, next) {
	res.render('index', { title: 'Gestão de barracas',dados: getCookieData(req),role:"admin",loggedin: true });
});

router.get('/', loggedIn, function(req, res, next) {
	res.render('index', { title: 'Gestão de barracas',dados: getCookieData(req), loggedin: true });
});

router.get('/fila/:numero',loggedIn,function(req, res, next){
	var fila = req.params.numero;
	require('./../components/barracas/controller/filaBarracas')(fila).then(function(dados){
		var title="Fila "+fila
		res.render('esquemaFilaBarracas',{title: title,dados:dados})
	}).catch(function(err){
		res.status(404).json(err)
	})
})

router.get('/vista-geral',loggedIn, function(req, res, next){
	res.render('vistaGeral',{title: "Vista Geral"})
})

//API
router.get('/alterar/reserva/:id',loggedIn, function(req, res, next){
	var options=req.params;
	require('./../components/barracas/controller/getReserve')(options).then(function(dados){
		res.status(200).json(dados);//render('esquemaFilaBarracas',{title: title,dados:dados})
	}).catch(function(err){
		res.status(404).json(err)
	})	
})

router.get('/alterar/aluguer/:id',loggedIn,function(req, res, next){
	var options=req.params;
	require('./../components/barracas/controller/getRent')(options).then(function(dados){
		res.status(200).json(dados);//render('esquemaFilaBarracas',{title: title,dados:dados})
	}).catch(function(err){
		res.status(404).json(err)
	})	
})


router.get('/relatorios/aluguer/hoje',loggedIn,function(req, res, next){
	require('./../components/barracas/controller/relatorioAluguers')().then(function(dados){
		res.render("relatorioAluguers",{title:"Relatório aluguers ao dia" ,dados:dados})
	}).catch(function(err){
		res.status(404).json(err)
	})
})

router.get('/informacao',function(req,res){
	res.render("informacao",{title:"Informações sobre aluguer de barracas e chapéus"})
})


router.post('/login',function(req, res, next){
	var cookies = new Cookies( req, res, { "keys": keys } ), unsigned, signed, tampered;
	var options=req.body
    options.ip=req.connection.remoteAddress
	options.platform=req.headers['user-agent']

	function callBack(name,accessId,userId,token){
		cookies.set( "name", name ).set( "accessId", accessId ).set("userId", userId).set( "accessToken", token, { signed: true, maxAge: (1000 * 60 * 60 * 30 * 12) } );
	}

	require('./../components/barracas/controller/login')(options,callBack).then(function(dados){
		res.redirect("/")
	}).catch(function(err){
		res.status(404).json(err)
	})
})

//LOGOUT
router.post('/users/revoke/access/',loggedIn,function(req,res){
	var attributes=req.body
	require('./../components/barracas/controller/revokeAccessToken')(attributes).then(function(data){
		res.redirect('/users/manage/accesses')
	}).catch(function(err){
		res.redirect('/users/manage/accesses')
	})
})

//Change to post add time security and limit access to this.
router.get('/alugar/barraca/:id',loggedIn,function(req,res, next){
	var id=req.params.id
	var price=req.query.price
	var userId=req.cookies.userId
	transporter={
		id:id,
		price:price,
		userId: userId
	}
	console.log(transporter)
	require('./../components/barracas/controller/alugarBarracaDia')(transporter).then(function(id){
		console.log(id)
		var fila="Fila 1"
		res.status(200).json({id:id})
	}).catch(function(err){
		res.status(404).json(err)
	})	
})

//Change to post add time security and limit access to this.
router.get('/reservar/barraca/:id',loggedIn,function(req,res, next){
	var id=req.params.id
	var price=req.query.price
	var startDate=req.query.startDate
	var endDate=req.query.endDate
	var name=req.query.name
	var userId=req.cookies.userId
	transporter={
		id: id,
		price: price,
		startDate: startDate,
		endDate: endDate,
		name: name,
		userId: userId
	}
	require('./../components/barracas/controller/reservarBarraca')(transporter).then(function(id){
		res.status(200).json({id:id})
	}).catch(function(err){
		res.status(404).json(err)
	})	
})


///ADMINISTRATION

router.get('/users/manage/accesses',loggedIn,isAdmin,function(req,res){
	var attributes={}
	require('./../components/barracas/controller/manageAccesses')(attributes).then(function(data){
		res.render('manageAccesses',{
			title:"Acessos",
			dados: data
		})
	}).catch(function(err){
			res.status(404).json(err)

	})
})

router.get('/users/manage/users',loggedIn,isAdmin,function(req,res){
	var attributes={}
	require('./../components/barracas/controller/manageUsers')(attributes).then(function(data){
		res.render('manageUsers',{
			title:"Users",
			dados: data
		})
	}).catch(function(err){
			res.status(404).json(err)
	})
})

router.post('/users/set/password',loggedIn,isAdmin,function(req,res){
	var options=req.body
	require('./../components/barracas/controller/setPassword')(options).then(function(dados){
		res.redirect('/users/manage/users');
	}).catch(function(err){
		res.status(404).json(err)
	})
})

router.post('/users/set/active-state',loggedIn,isAdmin,function(req,res){
	var options=req.body
	require('./../components/barracas/controller/setUserActiveState')(options).then(function(dados){
		res.redirect('/users/manage/users');
	}).catch(function(err){
		res.status(404).json(err)
	})
})

router.post('/users/create/user/',loggedIn,isAdmin,function(req,res){
	var options=req.body
	require('./../components/barracas/controller/createUser')(options).then(function(dados){
		res.redirect('/users/manage/users');
	}).catch(function(err){
		res.status(404).json(err)
	})		
})

router.get('/cancelar/aluguer/:id',loggedIn,isAdmin,function(req, res, next){
	var options=req.params;
	require('./../components/barracas/controller/cancelRent')(options).then(function(dados){
		res.render('index',{ title: 'Gestão de barracas' })
	}).catch(function(err){
		res.status(404).json(err)
	})	
})


module.exports = router;
