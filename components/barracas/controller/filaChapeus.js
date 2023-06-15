
var models= require('./../models');

//must come ordered by number (see problems with annexes ex: 1 1A)
var data=[]


module.exports = function(row){

 return new Promise(function(resolve,reject){
 	var call='getRow'
 	var attributes={}
 	attributes.where={
 		"localizacao":"Fila Chapeu "+row,
 		"tipo":"Chapeu"
		}

    models[call](attributes).then(function(res){
    
      if(res instanceof Error){
          //Send the error in the status send rejection to promise
          //Args:queryData,pagination,code,message
          reject( [] );
      }else{
      	var data={}
      	var result=[]

      	for ( i in res.rows){
      	    let row=res.rows[i]
            let rented=false
      		let reserved=false
      		let id=row.dataValues.id
            let startDate=""
            let endDate=""
            let rentId=""
      		try{
      			rented=res.rows[i].dataValues.Aluguer.dataValues.data
      			rented=isDateToday(rented	)
                rentId=res.rows[i].dataValues.Aluguer.dataValues.id
      		}catch(err){
      			rented=false
      		}
            try{
                startDate=res.rows[i].dataValues.Reserva.dataValues.inicio
                endDate=res.rows[i].dataValues.Reserva.dataValues.fim
                reserved=isReserved(startDate,endDate)
                startDate=getDatePart(startDate)
                endDate=getDatePart(endDate)
                //rented=isDateToday(rented )
            }catch(err){
            reserved=false
            }
      		data[id]={
      			id:	id,
      			number: row.dataValues.numero,
      			rented: rented,
      			reserved: reserved,
                //They all are
      			frontal: row.dataValues.subTipo=="Frontal"? true : false,
                //Chapeus não tem orientção
                subtipo: "Traseira",
                startDate: startDate,
                endDate: endDate,
      			pago: false,
                rentId: rentId,
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
  if( now.getTime()>start.getTime() && now.getTime()<end ){
    return true
  }else{
    return false
  }
  
}