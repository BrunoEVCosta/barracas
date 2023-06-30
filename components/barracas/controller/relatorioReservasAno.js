const {Sequelize,Op} =require('sequelize')
const db=require('../../sqldb')

module.exports = function(options){
    const {espacoId,ano}=options
    return db.Reservas.findAll({
        include:[{
           model:db.ReservasEdicoes
        }],
        where:{
            barracaChapeusId:espacoId,
            [Op.and]:Sequelize.where(db.sequelize.fn('YEAR', db.sequelize.col('Reservas.inicio')), ano)
        }
    }).then(data=>{
        let results={}
        console.log(results)

        for (let [index,row] of data.entries() ){
            results[row.id]={
                del:row.dataValues.del,
                inicio:row.dataValues.inicio,
                fim: row.dataValues.fim
            }
            if(row.dataValues.ReservasEdico){
                let edicao=row.dataValues.ReservasEdico
                results[edicao.dataValues.reservaId]={
                    del:edicao.dataValues.del,
                    inicio:edicao.dataValues.inicio,
                    fim: edicao.dataValues.fim
                }
            }
        }
        let output=[]
        for (key in results){
            if(results[key].del==false){
                output.push(results[key])
            }
        }
        return output
    }).catch(e=>{
        console.log(`Error getting reserves for item ${espacoId}: `,e)
        return e
    })
}