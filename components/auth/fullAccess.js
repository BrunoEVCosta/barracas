const Cookies = require('cookies');
const Keygrip = require("keygrip");
const keylist=require("../.././config_barracas").cookies.keylist
const keys = new Keygrip(keylist,'sha256','hex')
const getAccessTokenById=require('./getAccessTokenById')

function isLoggedIn(req,res,next){
    var cookies = new Cookies( req, res, { "keys": keys } ), unsigned, signed, tampered;
    var attributes={}
    attributes.id=cookies.get('accessId',{signed:true})
    let accessToken=cookies.get('accessToken',{signed:true})
    getAccessTokenById(attributes).then(function(access){
        if(accessToken === access.accessToken && access.valid)
            next()
        else
            res.render("index")
    }).catch(function(err){
        res.render("index");
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
    attributes.id=cookies.get( "accessId",{signed:true})
    return new Promise(function(res,rej){
        getAccessTokenById(attributes).then(function(access){
            res(access.Pessoa.dataValues.permissao)
        }).catch(function(err){
            rej(err)
        })
    })
}

function getUserId(req,res){
    var cookies = new Cookies( req, res, { "keys": keys } ), unsigned, signed, tampered;
    return cookies.get('userId',{signed:true})
}

module.exports= {
    isLoggedIn,
    isAdmin,
    getUserId
}