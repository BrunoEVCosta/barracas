var express = require('express');
var router = express.Router();
var tpAuth=require('./../components/barracas/controller/manageThirdPartyAuth')
var Cookies = require('cookies');
var Keygrip = require("keygrip");
var keylist=["SEKRIT2", "SEKRIT1"]; //Set a list of o keys.
var keys = new Keygrip(keylist,'sha256','hex')
const CLIENT_ID="925812534339-sf6kqg166hfuvliktmmfqejc8dmdo4bd.apps.googleusercontent.com"
const {isLoggedIn,isAdmin}=require('./../components/auth/fullAccess')


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

/* GET home page. */
router.get('/admin', isLoggedIn, isAdmin, function(req, res, next) {
  res.render('index', { title: 'Gestão de barracas',dados: getCookieData(req),role:"admin",loggedin: true });
});

router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Gestão de barracas',dados: getCookieData(req), loggedin: true });
});

router.get('/signedout',function(req,res){
  res.render('signedout',{title: 'Gestão de barracas'})
})

router.get('/barracas/fila/:numero',isLoggedIn,function(req, res, next){
  var fila = req.params.numero;
  require('./../components/barracas/controller/filaBarracas')(fila).then(function(dados){
    var title="Fila "+fila
    res.render('esquemaFilaBarracas',{title: title,dados:dados})
  }).catch(function(err){
    res.status(404).json(err)
  })
})

router.get('/chapeus/fila/:numero',isLoggedIn,function(req, res, next){
  var fila = req.params.numero;
  require('./../components/barracas/controller/filaChapeus')(fila).then(function(dados){
    var title="Fila "+fila
    res.render('esquemaFilaChapeus',{title: title,dados:dados})
  }).catch(function(err){
    res.status(404).json(err)
  })
})

router.get('/vista-geral',isLoggedIn, function(req, res, next){
  res.render('vistaGeral',{title: "Vista Geral"})
})

//API

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


router.post('/login',function(req, res, next){
  var cookies = new Cookies( req, res, { "keys": keys } ), unsigned, signed, tampered;
  var options=req.body
  options.ip=req.connection.remoteAddress.split(":").pop()
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

router.post('/login/redirect/google',function(req,res){
  console.log(req.body)
})
router.get('/login/redirect/google',function(req,res){
  console.log(req.query)
})

router.post('/login/verify/google-token',function(req,res){
  const {OAuth2Client} = require('google-auth-library');
  const client = new OAuth2Client(CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.body.client_id,
      audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    var cookies = new Cookies( req, res, { "keys": keys } ), unsigned, signed, tampered;
    var options={}
    let ipv4=null
    let ipv6 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ipv6.substr(0, 7) == "::ffff:") {
      ipv4 = ipv6.substr(7)
    }
    options.ip=ipv4
    options.platform=req.headers['user-agent']

    function callBack(error,name,accessId,userId,token){
      if(error){
        let msg = error.message
        res.json(msg)
      }else{
        cookies.set( "name", name ).set( "accessId", accessId ).set("userId", userId).set( "accessToken", token, { signed: true, maxAge: (1000 * 60 * 60 * 30 * 12) } );
        res.json("Logged in! Reload page!")
      }
    }

    const active= await tpAuth.lookUpPersonByEmailAuthentication(payload,options,callBack)
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify().catch(console.error);
})
//LOGOUT
router.post('/users/revoke/access/',isLoggedIn,function(req,res){
  var attributes=req.body
  require('./../components/barracas/controller/revokeAccessToken')(attributes).then(function(data){
    res.redirect('/signedout')
  }).catch(function(err){
    res.redirect('/')
  })
})

//Change to post add time security and limit access to this.
router.get('/alugar/barraca/:id',isLoggedIn,function(req,res, next){
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

// Reserve layout
router.get('/calendar/:espaco',isLoggedIn,function(req,res){
  let espaco = req.params.espaco
  res.render('calendar/layout',{title:"Layout", espaco })
})



///ADMINISTRATION

router.get('/users/manage/accesses',isLoggedIn,isAdmin,function(req,res){
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

router.get('/users/manage/users',isLoggedIn,isAdmin,function(req,res){
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

router.post('/users/set/password',isLoggedIn,isAdmin,function(req,res){
  var options=req.body
  require('./../components/barracas/controller/setPassword')(options).then(function(dados){
    res.redirect('/users/manage/users');
  }).catch(function(err){
    res.status(404).json(err)
  })
})

router.post('/users/set/active-state',isLoggedIn,isAdmin,function(req,res){
  var options=req.body
  require('./../components/barracas/controller/setUserActiveState')(options).then(function(dados){
    res.redirect('/users/manage/users');
  }).catch(function(err){
    res.status(404).json(err)
  })
})

router.post('/users/create/user/',isLoggedIn,isAdmin,function(req,res){
  var options=req.body
  require('./../components/barracas/controller/createUser')(options).then(function(dados){
    res.redirect('/users/manage/users');
  }).catch(function(err){
    res.status(404).json(err)
  })    
})

router.get('/cancelar/aluguer/:id',isLoggedIn,isAdmin,function(req, res, next){
  var options=req.params;
  require('./../components/barracas/controller/cancelRent')(options).then(function(dados){
    res.render('index',{ title: 'Gestão de barracas' })
  }).catch(function(err){
    res.status(404).json(err)
  })  
})




module.exports = router;
