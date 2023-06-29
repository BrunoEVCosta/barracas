var express = require('express');
var router = express.Router();
const {isLoggedIn,isAdmin}=require('./../components/auth/fullAccess')

router.get('/vue/collapse',(req,res)=>{
    res.render("factory/vue/collapse")
})
router.get('/vue/fila',(req,res)=>{
    res.render("factory/vue/fila")
})

router.get('/vue/reservas-tr',(req,res)=>{
    res.render("factory/vue/reservas-tr")
})
module.exports = router