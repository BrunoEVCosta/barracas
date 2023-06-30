var express = require('express');
var router = express.Router();
const {getUserId, isLoggedIn,isAdmin}=require('./../components/auth/fullAccess')
const listRows = require("./../components/barracas/controller/listRows");
const managePrices = require("./../components/barracas/controller/prices");
const filaBarracas = require("./../components/barracas/controller/filaBarracas");
const filaChapeus = require("./../components/barracas/controller/filaChapeus");
const getRow=require("./../components/barracas/controller/getRow")
const reservasAno=require('./../components/barracas/controller/relatorioReservasAno')
const relatorioReservas = require('./../components/barracas/controller/relatorioReservas')
const criarReserva=require('./../components/barracas/controller/reservarCriar')
const pago=require('./../components/barracas/controller/pago')

// API
router.get('/list/rows/:tipo',(req,res)=>{
    listRows(req.params).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
})

router.post('/set/price',isLoggedIn,isAdmin,(req,res)=>{
    managePrices.setPrice(req.body).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
})

router.post('/set/pago',isLoggedIn,(req,res)=>{
    pago(req.body).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
})

router.get('/list/prices',(req,res)=>{
    managePrices.listPrices().then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
})

router.get('/list/subTypes',(req,res)=>{
    let subtypes = managePrices.listSubTypes()
    res.json(subtypes)
})
router.get('/list/durations',(req,res)=>{
    let durations = managePrices.listDurations()
    res.json(durations)
})

//TODO
// Check request origin Allow internal only? or certain links
// Is public now
router.get('/fila/:tipo/:filaNumero',async (req,res)=>{
    let tipo=req.params.tipo
    let fila=req.params.filaNumero
    let metaFila
    try{
        if(tipo=="barracas"){
            metaFila= await filaBarracas(fila)
            res.json(metaFila)
        }else if(tipo=="chapeus"){
            metaFila= await filaChapeus(fila)
            res.json(metaFila)
        }else{
            throw new Error("IncorrectTipInURL")
        }
    }catch(e){
        res.json(e)
    }
})

router.get('/get-row/:tipo/:numero',async (req,res)=>{
    try{
        const {tipo,numero} =req.params
        let rowInfo=await getRow(tipo,numero)
        if(rowInfo instanceof Error) throw rowInfo
        res.json(rowInfo)
    }catch (e) {
        res.json({error:{msg:e.message,stack:e.stack}})
    }
})

router.get('/reservas/:ano/:espacoId',isLoggedIn,function(req,res,next){
    var options=req.params;
    reservasAno(options).then(dados=>{
        res.json(dados)
    }).catch(function(err){
        res.status(404).json(err)
    })
})

router.post('/reserve/item',isLoggedIn, async (req,res)=>{
    try {
        let options = {
            barracaChapeusId: req.body.barracaChapeusId,
            valor: req.body.valor,
            inicio: req.body.inicio,
            fim: req.body.fim,
            nome: req.body.nome,
            operadorId: req.body.operadorId,
        }
        let result=await criarReserva(options)
        if (result instanceof Error) throw Error
        let created=result.dataValues.barracaChapeusId==options.barracaChapeusId
        res.json({created})
    }catch (e) {
        res.json(e)
    }
})

router.get('/relatorios/reservas/:ano/:mes',async (req,res)=>{
    let options=req.params
    try{
        let results=await relatorioReservas(options)
        res.json(results)
    }catch (e) {
        res.json({error:{msg:e.message}})
    }

})

router.post('/check/availability',async (req,res)=>{
    const {id,startDate,endDate}=req.body
})

router.get('/get/userId',isLoggedIn,(req,res)=>{
    let userId=getUserId(req,res)
    res.json({userId})
})

module.exports = router