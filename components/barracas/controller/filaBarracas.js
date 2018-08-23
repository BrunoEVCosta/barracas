
var models= require('./../models');

//must come ordered by number (see problems with annexes ex: 1 1A)
var data=[]
data.push({id:'1',number:'1',rented:true,reserved:true})
data.push({id:'2',number:'1A',rented:true,reserved:true})
data.push({id:'3',number:'2',rented:true,reserved:false})
data.push({id:'4',number:'3',rented:false,reserved:false})
data.push({id:'5',number:'4',rented:false,reserved:false})
data.push({id:'6',number:'5',rented:false,reserved:false})
data.push({id:'7',number:'6',rented:false,reserved:false})
data.push({id:'8',number:'7',rented:false,reserved:false})
data.push({id:'9',number:'8',rented:false,reserved:false})
data.push({id:'10',number:'11',rented:false,reserved:false})
data.push({id:'11',number:'34A',rented:false,reserved:false})
data.push({id:'12',number:'44',rented:false,reserved:false})

module.exports = function(row){

 return new Promise(function(resolve,reject){
 	var call='getRow'
 	var attributes=''
    models[call](attributes).then(function(res){
    
      if(res instanceof Error){
          //Send the error in the status send rejection to promise
          //Args:queryData,pagination,code,message
          reject( [] );
   
      }else{
      	console.log(res)
      	var data=[]
      	for ( i in res.rows){
      		let row=res.rows[i]
      		let rented=false
      		try{
      			rented=res.rows[i].dataValues.Aluguer.dataValues.data
      			//Is data today
      		}catch(err){
      			rented=false
      		}

      		data.push({ 
      			id:	row.dataValues.id,
      			number: row.dataValues.numero,
      			rented: rented,
      			reserved: false,
      			frontal: row.dataValues.subTipo=="Frontal"? true : false,
      			pago: false,
      		})
      	}

        resolve(data);
      }//end else
      //end then
    }).catch(function(err){
      //queryData,pagination,code,message
      console.trace(err)
      reject( [] );

    })

  })
}