var express = require('express');
var router = express.Router();
const {isLoggedIn,isAdmin}=require('./../components/auth/fullAccess')

router.get('/vue/collapse',(req,res)=>{
    res.render("factory/vue/collapse")
})
router.get('/vue/fila',(req,res)=>{
    res.render("factory/vue/fila")
})
module.exports = router