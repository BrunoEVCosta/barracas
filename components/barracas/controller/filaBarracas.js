const Op=require("sequelize")
const db=require('../../sqldb')
var models= require('./../models');

//must come ordered by number (see problems with annexes ex: 1 1A)
var data=[]


module.exports = function(row){
    let currentYear=getYear(new Date())
     return new Promise(function(resolve,reject){
        var call='getRow'
        var attributes={}
        attributes.where={
            "localizacao":"Fila "+row,
            "tipo": "Barraca",
            //TODO add where condition for this year
            //Works but filters out non rented. Needs or Reserva, and allow all the tents to appear.
            //[Op.and]:Op.where(db.sequelize.fn('YEAR', db.sequelize.col('Aluguer.data')), currentYear)
        }

    models[call](attributes).then(function(res){

      if(res instanceof Error){
          //Send the error in the status send rejection to promise
          //Args:queryData,pagination,code,message
          reject( [] );
      }else{
      	var data={}
      	var result=[]
        var vertical=1
        //TODO iterated
      	for ( let i in res.rows){
      	    let row=res.rows[i]
            let rented=false
      		let reserved=false
      		let id=row.dataValues.id
            let startDate=""
            let endDate=""
            let rentId=""
            let duration=""
            let annex=row.dataValues.numero.endsWith("A")
      		try{
                //Doesn't iterate values in aluguer. Should join with diferent key so it got an array
      		    rented=res.rows[i].dataValues.Aluguer.dataValues.data
      			rented=isDateToday(rented)
                rentId=res.rows[i].dataValues.Aluguer.dataValues.id
                if(rented === true){
                    //Rented is based on today's date
                    let now=new Date()
                    let todayDate=getDatePart(now)
                    startDate=todayDate
                    endDate=todayDate
                    duration=res.rows[i].dataValues.Aluguer.dataValues.nome

                }
      		}catch(err){
      			rented=false
      		}
              //Reservas
            try{
                let reservas=res.rows[i].dataValues.Reservas
                if(reservas.length>0) {
                    for (let [index, reserva] of reservas.entries()){
                        if (reserva.dataValues.ReservasEdico) {
                            //Gets last record from editions, which is actually what is desired so it's OK.
                            //Reservas also uses edicão
                            let edicao=reserva.dataValues.ReservasEdico
                            let tempStartDate = edicao.dataValues.inicio
                            let tempEndDate = edicao.dataValues.fim
                            let tempIsReserved= isReserved(tempStartDate, tempEndDate)
                            if(tempIsReserved == true && edicao.dataValues.del==false) {
                                reserved = reserved === true || tempIsReserved
                                startDate = getDatePart(tempStartDate)
                                endDate = getDatePart(tempEndDate)
                                //TODO get new location if necessary
                                //Deal with change in location.
                                //How to know if the change in location was from another row?
                                //New query to get reserved withing time period that include the metioned item.
                                //Affects reserves as well
                            }
                        } else {
                            let tempStartDate = reserva.dataValues.inicio
                            let tempEndDate = reserva.dataValues.fim
                            let tempIsReserved= isReserved(tempStartDate, tempEndDate)
                            if(tempIsReserved == true && reserva.dataValues.del==false) {
                                reserved = reserved === true || tempIsReserved
                                startDate = getDatePart(tempStartDate)
                                endDate = getDatePart(tempEndDate)
                            }
                        }
                    }
                }
            }catch(err){
                reserved=false
            }

      		data[id]={ 
      			id,
      			number: row.dataValues.numero,
      			rented,
      			reserved,
      			frontal: row.dataValues.subTipo=="Frontal"? true : false,
                traseira: row.dataValues.subTipo=="Traseira" ? true : false,
                subtipo: row.dataValues.subTipo,
                startDate: startDate,
                endDate: endDate,
      			pago: false,
                rentId: rentId,
                annex,
                duration
      		}
      	}
      	for (i in data){
      		result.push(data[i])
      	}
        resolve(result);
      }//end else
      //end then
    }).catch(function(err){
      //queryData,pagination,code,message
      console.trace(err)
      reject( [] );

    })

  })
}

function isDateToday(date){
	var now=new Date()
	var d=new Date(date)
	if (now.getFullYear()==d.getFullYear()){
		if(now.getMonth()==d.getMonth()){
			if(now.getDate()==d.getDate()){
				return true
			}
		}
	}
	return false
}

function getDatePart(date){
  var d=new Date(date)
  let yyyy=d.getFullYear()
  let mm=pad(d.getMonth()+1,2)
  let dd=pad(d.getDate(),2)  
  return yyyy+"-"+mm+"-"+dd
}

function getYear(date){
    let d=new Date(date)
    let yyyy=d.getFullYear()
    return yyyy
}
function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function isReserved(start,end){
  var start=new Date(start)
  var end=new Date(end)
  var end=end.setDate(end.getDate()+1)
  var now=new Date()
  if( now.getTime()>=start.getTime() && now.getTime()<end ){
    return true
  }else{
    return false
  }
  
}