var rand = require('csprng')
var db=require('../sqldb')
var models= require('../barracas/models');

function addUserFromThirdParty(attributes){
  let newPerson={
    nome:`${attributes.given_name} ${attributes.family_name}`,
    email:attributes.email,
    permissao:'user',
    hash:rand(160,36)+rand(160,36),
    confirmationToken:rand(160,36)+rand(160,36)+rand(160,28)
  }
  return db.Pessoas.create(newPerson).then(data=>{
    return data
  }).catch(error=>{
    return error
  })
}

function lookUpPersonByEmailAuthentication(payLoad,options,callback){
  let email=payLoad.email
  db['Pessoas'].findOne({
    where:{email}
  }).then(data=>{
    authenticatePerson(payLoad,data,options,callback)
  }).catch(err=>{
    //TODO make this decent send error
    let active=false
    return active
  })

  async function authenticatePerson(payLoad,data,options,callback){
    try{
      if(data.dataValues.active===true){
        accessSession=await createAccessSession(data,options,callback)
      }else{
        //inactive user but in db
      }
    }catch(error){
      //Should define the error in which this is used!
      let newUser=await addUserFromThirdParty(payLoad)
      //This new user should be validated 
      let err=new Error("User created!")
      err.message="Foi criado um novo utilizador, assim que o utilizador for activado pelo administrador poderá fazer o login normalmente."
      callback(err) 
    }
  }
}


function createAccessSession(data,options,callback){
    if(options.ip==null) options.ip="127.0.0.1"

    data=data.dataValues
    let id = data.id
    let name = data.nome

    let attributes={
      name,
      id,
      ip:options.ip,
      platform: options.platform,
      valid: 1,
      accessToken:rand(160,36)+rand(160,36),
    }

  models['createAccess'](attributes).then(function(accessId){
    if(accessId instanceof Error){
      let error=accessId
      callback(error)  
    }else{
      callback(error=null,name,accessId,id,attributes.accessToken)
      return {accessId}      
    }
  })
      
}

module.exports={addUserFromThirdParty,lookUpPersonByEmailAuthentication}