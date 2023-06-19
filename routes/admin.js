var express = require('express');
var router = express.Router();
var tpAuth=require('../components/auth/manageThirdPartyAuth')
var Cookies = require('cookies');
var Keygrip = require("keygrip");
const keylist=require(".././config_barracas").cookies.keylist
var keys = new Keygrip(keylist,'sha256','hex')
const CLIENT_ID="925812534339-sf6kqg166hfuvliktmmfqejc8dmdo4bd.apps.googleusercontent.com"
const {isLoggedIn,isAdmin}=require('./../components/auth/fullAccess')
const login=require('../components/auth/login')
const {extractMetadataFromLogin}=require('.././components/auth/procedures')
const {OAuth2Client} = require("google-auth-library");
const revokeAccessToken=require('../components/auth/revokeAccessToken')

/* GET home page. */
function getCookieData(req,res){
    var cookies = new Cookies( req, res, { "keys": keys } ), unsigned, signed, tampered;

    //var cookies=req.cookies
    var result={
        name: cookies.get('name',{signed:true}),
        id: cookies.get('accessId',{signed:true})
    }
    return result;
}
router.get('/', isLoggedIn, isAdmin, function(req, res, next) {
    res.render('index', { title: 'Gestão de barracas',dados: getCookieData(req),role:"admin",loggedin: true });
});

router.post('/login',async function(req, res, next){
    var cookies = new Cookies( req, res, { "keys": keys } ), unsigned, signed, tampered;
    try{
        let options=req.body
        let loginMetadata=await extractMetadataFromLogin(req)
        if (loginMetadata instanceof Error) throw loginMetadata

        options=Object.assign(options,loginMetadata)
        let loginResult=await login(options,callBack)
        if (loginResult instanceof Error) throw loginResult

        res.redirect("/")
    }catch(err){
        res.status(404).json(err)
    }

    function callBack(name,accessId,userId,token){
        const maxAge=(1000 * 60 * 60 * 30 * 12)
        cookies.set( "name", name ).set( "accessId", accessId ).set("userId", userId)
        cookies.set( "name", name, { signed: true } ).set( "accessId", accessId, { signed: true,  } ).set("userId", userId, { signed: true  }).set( "accessToken", token, { signed: true } );
    }
})

//TODO does nothing for now
router.post('/login/redirect/google',function(req,res){
    console.log(req.body)
})
router.get('/login/redirect/google',function(req,res){
    console.log(req.query)
})


router.post('/login/verify/google-token',function(req,res){
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
        try{
            let loginMetadata=await extractMetadataFromLogin(req)
            if (loginMetadata instanceof Error) throw loginMetadata

            options=Object.assign(options,loginMetadata)
        }catch (err) {
            throw err
        }

        function callBack(error,name,accessId,userId,token){
            if(error){
                let msg = error.message
                res.json(msg)
            }else{
                cookies.set( "name", name ).set( "accessId", accessId ).set("userId", userId)
                cookies.set( "name", name, { signed: true } ).set( "accessId", accessId, { signed: true,  } ).set("userId", userId, { signed: true  }).set( "accessToken", token, { signed: true } );
                res.json("Logged in! Reload page!")
            }
        }

        const active= await tpAuth.lookUpPersonByEmailAuthentication(payload,options,callBack)
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    }
    verify().catch(console.error);
})





//Manage misc
router.get('/prices',isLoggedIn,isAdmin,(req,res)=>{
    res.render('admin/managePrices')
})

module.exports = router