const setPassword = require('./components/barracas/controller/setPassword')

//createUser

let id=1
let password=""

let options={id,password}
setPassword(options).then(data=>{
  console.log("lklklk")
})

