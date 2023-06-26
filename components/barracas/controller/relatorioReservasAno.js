const {Sequelize,Op} =require('sequelize')
const db=require('../../sqldb')

module.exports = function(options){
    const {espacoId,ano}=options
    return db.Reservas.findAll({
        where:{
            barracaChapeusId:espacoId,
            [Op.and]:Sequelize.where(db.sequelize.fn('YEAR', db.sequelize.col('Reservas.inicio')), ano)
        }
    })
}