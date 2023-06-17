const express = require('express');
const {isLoggedIn, isAdmin} = require("./../components/auth/fullAccess");
const revokeAccessToken = require("../components/auth/revokeAccessToken");
const router = express.Router();
const manageAccesses=require('../components/auth/manageAccesses')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//users
router.post('/revoke/access/',isLoggedIn,function(req,res){
  var attributes=req.body
  revokeAccessToken(attributes).then(function(data){
    res.redirect('/admin/signedout')
  }).catch(function(err){
    res.redirect('/')
  })
})

router.get('/manage/accesses',isLoggedIn,isAdmin,function(req,res){
  var attributes={}
  manageAccesses(attributes).then(function(data){
    res.render('manageAccesses',{
      title:"Acessos",
      dados: data
    })
  }).catch(function(err){
    res.status(404).json({err: {msg: err.message}})

  })
})

router.get('/manage/users',isLoggedIn,isAdmin,function(req,res){
  var attributes={}
  require('../components/auth/manageUsers')(attributes).then(function(data){
    res.render('manageUsers',{
      title:"Users",
      dados: data
    })
  }).catch(function(err){
    res.status(404).json({err: {msg: err.message}})
  })
})

router.post('/set/password',isLoggedIn,isAdmin,function(req,res){
  var options=req.body
  require('../components/auth/setPassword')(options).then(function(dados){
    res.redirect('/users/manage/users');
  }).catch(function(err){
    res.status(404).json({err: {msg: err.message}})
  })
})

router.post('/set/active-state',isLoggedIn,isAdmin,function(req,res){
  var options=req.body
  require('../components/auth/setUserActiveState')(options).then(function(dados){
    res.redirect('/users/manage/users');
  }).catch(function(err){
    res.status(404).json({err: {msg: err.message}})
  })
})

router.post('/create/user/',isLoggedIn,isAdmin,function(req,res){
  var options=req.body
  require('../components/auth/createUser')(options).then(function(dados){
    res.redirect('/users/manage/users');
  }).catch(function(err){
    res.status(404).json({err: {msg: err.message}})
  })
})


module.exports = router;
