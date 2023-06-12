const Cookies = require('cookies');
const Keygrip = require("keygrip");
const keylist=["SEKRIT2", "SEKRIT1"]; //Set a list of o keys.
const keys = new Keygrip(keylist,'sha256','hex')
const getAccessTokenById=require('./../barracas/controller/getAccessTokenById')

function isLoggedIn(req,res,next){
    var cookies = new Cookies( req, res, { "keys": keys } ), unsigned, signed, tampered;
    var attributes={}
    attributes.id=req.cookies.accessId
    getAccessTokenById(attributes).then(function(access){
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

function isAdmin(req,res,next){
    getScope(req,res).then(function(scope){
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

function getScope(req,res){
    var cookies = new Cookies( req, res, { "keys": keys } ), unsigned, signed, tampered;
    var attributes={}
    attributes.id=req.cookies.accessId
    return new Promise(function(res,rej){
        getAccessTokenById(attributes).then(function(access){
            res(access.Pessoa.dataValues.permissao)
        }).catch(function(err){
            rej(err)
        })
    })
}

module.exports= {
    isLoggedIn,
    isAdmin
}