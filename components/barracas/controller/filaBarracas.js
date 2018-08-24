
var models= require('./../models');

//must come ordered by number (see problems with annexes ex: 1 1A)
var data=[]


module.exports = function(row){

 return new Promise(function(resolve,reject){
 	var call='getRow'
 	var attributes={}
 	attributes.where={"localizacao":"Fila "+row}

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
      		let id=row.dataValues.id
      		try{
      			rented=res.rows[i].dataValues.Aluguer.dataValues.data
      			rented=isDateToday(rented	)
      		}catch(err){
      			rented=false
      		}

      		data[id]={ 
      			id:	id,
      			number: row.dataValues.numero,
      			rented: rented,
      			reserved: false,
      			frontal: row.dataValues.subTipo=="Frontal"? true : false,
      			pago: false,
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