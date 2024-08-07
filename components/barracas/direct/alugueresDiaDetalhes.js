const db = require('../../sqldb');
const Sequelize = require('sequelize');






module.exports = function(date){
    return db['Aluguer'].findAll({
        include: [{
            model:db['Pessoas'],
        },{
            model:db['BarracasChapeus'],
        }],
        where: Sequelize.where(Sequelize.fn('date', Sequelize.col('data')),date)
    }).then(function(model){

        return processExportData(model)
    }).catch(function(err){
        console.log('Get Row - Err: '+ err);
        return err;
    })
}


function processExportData(model){
    return model.map(aluguer=>{
        let date=aluguer.dataValues.registo.toJSON()
        return {
            Tipo:aluguer.BarracasChapeu.dataValues.tipo,
            Numero:aluguer.BarracasChapeu.dataValues.numero,
            Fila:aluguer.BarracasChapeu.dataValues.localizacao,
            Periodo:aluguer.dataValues.nome,
            Valor:aluguer.dataValues.valor,
            Pessoa:aluguer.Pessoa.dataValues.nome,
            Data:date.split("T")[0],
            Horas:date.split("T")[1].split(".")[0],
            "Time Zone":date.split("T")[1].split(".")[1]
        }
    })
}