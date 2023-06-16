var express = require('express');
var router = express.Router();


const {isLoggedIn,isAdmin}=require('./../components/auth/fullAccess')
const listRows=require("./../components/barracas/controller/listRows")
const managePrices = require('./../components/barracas/controller/prices')
const filaBarracas=require('./../components/barracas/controller/filaBarracas')
const filaChapeus=require('./../components/barracas/controller/filaChapeus')
const alugarBarracaDia=require('./../components/barracas/controller/alugarBarracaDia')
const login=require('../components/auth/login')
const {extractMetadataFromLogin}=require('.././components/auth/procedures')

//TODO used by 2 methods below should be packaged elsewere
function getCookieData(req){
  var cookies=req.cookies
  var result={
    name: cookies.name,
    accessId: cookies.accessId 
  }
  return result;
}

// USER LAND



router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Gestão de barracas',dados: getCookieData(req), loggedin: true });
});



router.get('/barracas/fila/:numero',isLoggedIn,function(req, res, next){
  var fila = req.params.numero;
  filaBarracas(fila).then(function(dados){
    var title="Fila "+fila
    res.render('esquemaFilaBarracas',{title: title,dados:dados})
  }).catch(function(err){
    res.status(404).json(err)
  })
})

router.get('/chapeus/fila/:numero',isLoggedIn,function(req, res, next){
  var fila = req.params.numero;
  filaChapeus(fila).then(function(dados){
    var title="Fila "+fila
    res.render('esquemaFilaChapeus',{title: title,dados:dados})
  }).catch(function(err){
    res.status(404).json(err)
  })
})




router.post('/alterar/reserva/datas',isLoggedIn, function(req, res, next){
  var options=req.body;
  options.userId=req.cookies.userId
  require('./../components/barracas/controller/reservaEditar')(options).then(function(dados){
    if (dados instanceof Error){
      res.status(400).json(dados)
    }else{
      res.status(200).status(200).json("ok");
    }
  }).catch(function(err){
    res.status(404).json(err)
  })
})

router.get('/alterar/reserva/:id',isLoggedIn, function(req, res, next){
  var options=req.params;
  require('./../components/barracas/controller/getReserve')(options).then(function(dados){
    res.status(200).json(dados);//render('esquemaFilaBarracas',{title: title,dados:dados})
  }).catch(function(err){
    res.status(404).json(err)
  })  
})



router.get('/alterar/aluguer/:id',isLoggedIn,function(req, res, next){
  var options=req.params;
  require('./../components/barracas/controller/getRent')(options).then(function(dados){
    res.status(200).json(dados);//render('esquemaFilaBarracas',{title: title,dados:dados})
  }).catch(function(err){
    res.status(404).json(err)
  })  
})


/*
Relatórios
 */
router.get('/relatorios/aluguer/hoje',isLoggedIn,function(req, res, next){
  require('./../components/barracas/controller/relatorioAluguers')().then(function(dados){
    res.render("relatorioAluguers",{title:"Relatório aluguers ao dia" ,dados:dados})
  }).catch(function(err){
    res.status(404).json(err)
  })
})

router.get('/relatorios/reservas/:ano/:mes/',isLoggedIn,function(req,res,next){
  var options=req.params;
  require('./../components/barracas/controller/relatorioReservas')(options).then(function(dados){
    res.render("relatorioReservas",{title:"Relatório reservas mês",dados:dados})
  }).catch(function(err){
    res.status(404).json(err)
  })  
})

router.get('/relatorios/reservas/:ano/:mes/:espacoId',isLoggedIn,function(req,res,next){
  var options=req.params;
  require('./../components/barracas/controller/relatorioReservas')(options).then(function(dados){
    res.json({dados})
  }).catch(function(err){
    res.status(404).json(err)
  })  
})



router.get('/informacao',function(req,res){
  res.render("informacao",{title:"Informações sobre aluguer de barracas e chapéus"})
})

router.get('/vista-geral',isLoggedIn, function(req, res, next){
  res.render('vistaGeral',{title: "Vista Geral"})
})
// Reserve layout
router.get('/calendar/:espaco',isLoggedIn,function(req,res){
  let espaco = req.params.espaco
  res.render('calendar/layout',{title:"Layout", espaco })
})




router.post('/alugar/barraca/:id',isLoggedIn,function(req,res, next){
  var id=req.params.id
  var price=req.body.price
  var nome=req.body.nome
  var userId=req.cookies.userId
  payload={
    id,
    price,
    userId,
    nome
  }
  alugarBarracaDia(payload).then(function(id){
    console.log(id)
    var fila="Fila 1"
    res.status(200).json({id:id})
  }).catch(function(err){
    res.status(404).json(err)
  })  
})

//Change to post add time security and limit access to this.
router.get('/reservar/barraca/:id',isLoggedIn,function(req,res, next){
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




//API
router.get('/cancelar/aluguer/:id',isLoggedIn,isAdmin,function(req, res, next){
  var options=req.params;
  require('./../components/barracas/controller/cancelRent')(options).then(function(dados){
    res.render('index',{ title: 'Gestão de barracas' })
  }).catch(function(err){
    res.status(404).json(err)
  })  
})




module.exports = router;
