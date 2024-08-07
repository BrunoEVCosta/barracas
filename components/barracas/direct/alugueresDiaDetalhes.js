const db = require('../../sqldb');
const Sequelize = require('sequelize');






module.exports = function(date){
    let now=new Date()
    let today=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDay()}`
    return db['Aluguer'].findAll({
        include: [{
            model:db['Pessoas'],
        },{
            model:db['BarracasChapeus'],
        }],
        where: Sequelize.where(Sequelize.fn('date', Sequelize.col('data')),today)
    }).then(function(model){

        return processExportData(model)
    }).catch(function(err){
        console.log('Get Row - Err: '+ err);
        return err;
    })
}


function processExportData(model){
    return model.map(aluguer=>{
        return {
            tipo:aluguer.BarracasChapeu.dataValues.tipo,
            barracaChapeu:aluguer.BarracasChapeu.dataValues.numero,
            fila:aluguer.BarracasChapeu.dataValues.localizacao,
            periodo:aluguer.dataValues.nome,
            valor:aluguer.dataValues.valor,
            pessoa:aluguer.Pessoa.dataValues.nome,
            registo:aluguer.dataValues.registo.toJSON(),
        }
    })
}