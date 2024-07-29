var db = require('../../sqldb');
var Sequelize = require('sequelize');


function get(id){
    return db['Comentarios'].findByPk(id).then(data=>data.comentario)
}

function update(id,comentario){
    return db['Comentarios'].update({comentario},{where: {id}})
}

function create(comentario){
    return db['Comentarios'].create({comentario})
}



module.exports = {
    get,
    update,
    create
}