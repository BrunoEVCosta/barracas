var express = require('express');
var router = express.Router();
const {isLoggedIn,isAdmin}=require('./../components/auth/fullAccess')

router.get('/vue/collapse',(req,res)=>{
    res.render("factory/vue/collapse")
})

module.exports = router