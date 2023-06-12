const express = require('express');
const router = express.Router();
const {isLoggedIn,isAdmin}=require('./../components/auth/fullAccess')


router.get("/",isLoggedIn,isAdmin,(req,res)=>{
    res.render("install")
})

module.exports = router

