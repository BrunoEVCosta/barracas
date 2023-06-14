const db=require("./../../sqldb")

function listPrices(){
    let result={}
    for(let type of listTypes()){
        result[type]=listSubTypes().reduce((acc,cur)=> {
            acc[cur] = listDurations().reduce((accumulatorDuration,curDuration)=> {
               accumulatorDuration[curDuration]={tipo:null,subTipo:null,extra:null,duracao:null,valor:null}
               return accumulatorDuration
            },{})
            return acc
        },{})
    }
    return db.Preco.findAll().then(data=>{
        for (let price of data){
            result[price.tipo][price.subTipo][price.duracao]=price
        }
        return result
    })
}


function setPrice(options){
    if(options.id){
        //update id
        return db.Preco.update({valor:options.valor},{where:{id:options.id}})
    }else{
        return db.Preco.create(options)
    }
}

function listTypes(){
    return db.Preco.rawAttributes.tipo.values
}
function listSubTypes(){
    return db.Preco.rawAttributes.subTipo.values
}

function listDurations(){
    return db.Preco.rawAttributes.duracao.values
}
module.exports = {
    listPrices,
    setPrice,
    listDurations,
    listSubTypes
}