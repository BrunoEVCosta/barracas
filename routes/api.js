var express = require('express');
var router = express.Router();
const {isLoggedIn,isAdmin}=require('./../components/auth/fullAccess')
const listRows = require("./../components/barracas/controller/listRows");
const managePrices = require("./../components/barracas/controller/prices");
const filaBarracas = require("./../components/barracas/controller/filaBarracas");
const filaChapeus = require("./../components/barracas/controller/filaChapeus");

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

router.get('/fila/:tipo/:filaNumero',isLoggedIn,async (req,res)=>{
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

module.exports = router