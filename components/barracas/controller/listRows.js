const db=require("./../../sqldb")

function query(options){
    return db["BarracasChapeus"].findAll({
        group:'localizacao',
        where:{
            tipo:options.tipo
        }
    })
}

module.exports = query