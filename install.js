const setPassword = require('./components/auth/setPassword')
const prompt = require('password-prompt')

let password = prompt('password: ')

//createUser

let id=1


password.then(password=>{
  let options={id,password}
  setPassword(options).then(data=>{
    console.log(`Password alterada para o utilizador ${data.nome} (${data.email}).`)
    process.exit(0)
  })  
})


