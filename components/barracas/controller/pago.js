const models= require('./../models')

module.exports = function(options){
    let call="setPago"
    return models[call](options).then(data=>{
        return data
    }).catch(e=>{
        return e
    })
}