
Vue.component('v-select', VueSelect)
window.app=new Vue({
    el:"#setup",
    data:{
        codigo:"",
        options:{
            tipo:[
                "Lateral","Traseira"
            ],
            anexoFrontal:[
                true,
                false
            ],
        },
        barracas:{
            numRows:0,
            rows:[]
        },
        chapeus:{
            numRows:0,
            rows:[]
        },
    },
    computed:{
        generateSchema:function(){
            codigo=`SET FOREIGN_KEY_CHECKS = 0;<br>TRUNCATE TABLE BarracasChapeus;<br>`
            tipo="barracas"
            for ( const [index,row] of this[tipo].rows.entries() ){
                let rowLen=this.calculateDistinctNumbersInRow(index,tipo)
                let rowRange=this.rowRange(index,tipo).split(",")
                let localizacao=`Fila ${index+1}`
                let subTipo=row.tipo
                let numero=""
                let type=_.capitalize(_.trimEnd(tipo,"s"))
                if(row.anexoFrontal===true){
                    numero=rowRange[0]+"A"
                    subTipo="Frontal"
                    if(row.tipo=="Traseira") subTipo="Traseira"
                    codigo+=`INSERT INTO BarracasChapeus (numero,tipo,subTipo,localizacao) VALUE ("${numero}","${type}","${subTipo}","${localizacao}");<br>`
                }
                for (let item of _.range(parseInt(rowRange[0]),parseInt(rowRange[1])+1)){
                    if(item == rowRange[0] && row.tipo=="Lateral"){
                        subTipo="Frontal"
                    }else{
                        subTipo=row.tipo
                    }
                    numero=item
                    codigo+=`INSERT INTO BarracasChapeus (numero,tipo,subTipo,localizacao) VALUE ("${numero}","${type}","${subTipo}","${localizacao}");<br>`
                }


            }
            tipo="chapeus"
            for ( const [index,row] of this[tipo].rows.entries() ){
                let rowLen=this.calculateDistinctNumbersInRow(index,tipo)
                let rowRange=this.rowRange(index,tipo).split(",")
                let localizacao=`Fila Chapeu ${index+1}`
                let subTipo=row.tipo
                let numero=""
                let type=_.capitalize(_.trimEnd(tipo,"s"))
                if(row.anexoFrontal===true){
                    numero=rowRange[0]+"A"
                    subTipo="Frontal"
                    if(row.tipo=="Traseira") subTipo="Traseira"

                    codigo+=`INSERT INTO BarracasChapeus (numero,tipo,subTipo,localizacao) VALUE ("${numero}","${type}","${subTipo}","${localizacao}");<br>`
                }
                for (let item of _.range(parseInt(rowRange[0]),parseInt(rowRange[1])+1)){
                    if(item == rowRange[0] && row.tipo=="Lateral"){
                        subTipo="Frontal"
                    }else{
                        subTipo=row.tipo
                    }
                    numero=item
                    codigo+=`INSERT INTO BarracasChapeus (numero,tipo,subTipo,localizacao) VALUE ("${numero}","${_.capitalize(tipo)}","${subTipo}","${localizacao}");<br>`
                }
            }
            codigo+="SET FOREIGN_KEY_CHECKS = 1;"
            return codigo
        }
    },
    methods:{
        rowIter:function (type){
            possibleTypes=["chapeus","barracas"]
            if(possibleTypes.indexOf(type) != -1) {
                if (this[type].numRows > this[type].rows.length) {
                    for (let i = this[type].rows.length; i < this[type].numRows; i++) {
                        this[type].rows.push({
                            tipo: "Lateral",
                            anexoFrontal: false,
                            elementos: 1,
                            anexosExtra: []
                        })
                    }
                } else {
                    for (let d = this[type].rows.length; d > this[type].numRows; d--) {
                        this[type].rows.pop()
                    }
                }
                return this[type].rows
            }else{
                return []
            }

        },
        rowRange:function(row,type){
            let sum=0
            for(let r=0; r<row; r++){
                sum+=parseInt(this.calculateDistinctNumbersInRow(r, type))
            }
            return [sum+1,sum+parseInt(this.calculateDistinctNumbersInRow(row,type))].toString()
            //return []
        },
        calculateDistinctNumbersInRow:function(row,type){
            let elements=this[type].rows[row].elementos
            if(this[type].rows[row].tipo=="Lateral"){
                if(this[type].rows[row].anexoFrontal==true){
                    elements-=1
                }
                elements-=this[type].rows[row].anexosExtra.length
            }
            return parseInt(elements)
        },

    },
    async beforeMount(){

    }
})