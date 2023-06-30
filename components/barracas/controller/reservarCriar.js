const models=require('./../models')

module.exports = async function(options){
    const call="reservarCriar"
    try {
        let results = await models[call](options)
        if(results instanceof Error) throw results
        return results
    }catch (e) {
        return e
    }
}