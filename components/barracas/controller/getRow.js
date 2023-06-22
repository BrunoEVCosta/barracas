const db=require("../.././sqldb")


module.exports = async function(tipo,numero){
    try {
        return result=await db.BarracasChapeus.findOne({
            where: {
                tipo,
                numero
            }
        })
    }catch (e) {
        return e
    }
}