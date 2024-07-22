
Vue.component("collapse",(resolve,reject)=>{
    $.get('/factory/vue/collapse',(data,textStatus,jqXHR)=>{
        resolve({
            template:data,
            props:{
                tipo:String,
                item:Object,
                precos:Object
            },
            data:function(){
                return {
                    outroPreco:0.00
                }

            },
            computed:{},
            methods:{
                async alugar(el){
                    let price=el.target.attributes.price.value
                    let duracao=el.target.attributes.duracao.value
                    var dialog=confirm("Quer alugar a barraca "+this.item.number+" por "+price+"€?")
                    if (dialog == true) {
                        let result = await $.post("/alugar/barraca/" + this.item.id, {price,nome:duracao})

                        this.$el.classList.remove("show")
                        this.item.rented=true
                        this.item.rentId=result.id
                        let now=this.nowDate();
                        //TODO Set duration
                        //now only has the granularity of a day
                        this.item.duration=duracao
                        this.item.startDate=now
                        this.item.endDate=now

                    }
                },
                reservar(){
                    let now=this.nowDate();
                    let collapse=this.$el


                    $('.modal#reserveTent .date#startDate').val(now)
                    $('.modal#reserveTent .date#endDate').val(now)
                    $('.modal#reserveTent input.id').val(this.item.id)
                    $('.modal#reserveTent').modal('show');
                    let that=this

                    $('.modal#reserveTent button.reservar').click(function(){
                        var name=$('.modal#reserveTent input#name').val()
                        var startDate=$('.modal#reserveTent .date#startDate').val()
                        var endDate=$('.modal#reserveTent .date#endDate').val()
                        var price=$('.modal#reserveTent input#price').val()
                        var pago=$('.modal#reserveTent input#pago').val()

                        $.get("/reservar/barraca/"+that.item.id+"?name="+name+"&startDate="+startDate+"&endDate="+endDate+"&price="+encodeURI(price)+"&pago="+pago, function(data){
                                $('.modal#reserveTent').modal('hide');
                                collapse.classList.remove('show')
                                that.item.reserved=true
                                that.item.rentId=data.id
                                that.item.startDate=startDate
                                that.item.endDate=endDate
                            }
                        )
                    })
                },
                nowDate(){
                    let d=new Date();
                    let yyyy=d.getFullYear()
                    let mm=this.pad(d.getMonth()+1,2)
                    let dd=this.pad(d.getDate(),2)
                    return yyyy+"-"+mm+"-"+dd
                },
                pad(num, size) {
                    var s = num+"";
                    while (s.length < size) s = "0" + s;
                    return s;
                }
            }
        })
    })
})
Vue.component("fila",(resolve,reject)=> {
    $.get('/factory/vue/fila', (data, textStatus, jqXHR) => {
        resolve({
            template:data,
            props:{
                fila:Array,
                mini:Boolean,
                excludeType:String,
                orientacao:String,
                selected:String,
            },
            data:function(){
                return {}
            },
            computed:{},
            methods:{}
        })
    })
})
window.app=new Vue({
    el:"#app",
    data:{
        alternativeDate:undefined,
        subTipos:[],
        duracoes:[],
        precos:[{}],

        fila: {
            barracas: [],
            chapeus: [],
        },
        geral:{
            barracas:{},
            chapeus:{}
        },
    },
    computed:{
        test(a){
            return console.log(a)
        }
    },
    methods:{
        setSpacing(index){
            if(index>1) return true
            else return false
        },
        gotoDate(){
            let alternativaDate=this.alternativeDate.split("-")
            if(alternativaDate.length==3){
                location.pathname=`/vista-geral/${alternativaDate[0]}/${alternativaDate[1]}/${alternativaDate[2]}`
            }
            console.log(this.alternativeDate)
        },
        elementosFrontais(tipo,fila){
            try {
                return this.geral[tipo][fila].frontais
            }catch (e) {
                return []
            }

        },
        elementosDaFila(tipo,fila){
            if (this.geral[tipo][fila] == undefined){
                return {}
            }else{
                return this.geral[tipo][fila]
            }
        }
    },
    async beforeMount(){
        let pathnameArray=location.pathname.split("/")
        let alternativeDate
        if(pathnameArray.length==5){
            alternativeDate=`${pathnameArray[2]}/${pathnameArray[3]}/${pathnameArray[4]}`
        }
        this.fila.barracas=await $.get("/api/v1/list/rows/Barraca")
        this.fila.chapeus=await $.get("/api/v1/list/rows/Chapeu")

        //Not used yet
        this.subTipos=await $.get("/api/v1/list/subTypes")
        this.duracoes=await $.get("/api/v1/list/durations")
        this.precos=await $.get("/api/v1/list/prices")

        for (let [index,fila] of this.fila.barracas.entries()){
            let tipo="barracas"
            let numFila=index+1  //Human numbers

            let barracaChapeu
            if(alternativeDate===undefined){
                barracaChapeu=await $.get(`/api/v1/fila/${tipo}/${numFila}`)
            }else {
                barracaChapeu = await $.get(`/api/v1/fila/${tipo}/${numFila}/${alternativeDate}`)
            }

            let orientacao=barracaChapeu.find(el=>["Traseira","Lateral","Frontal"].indexOf(el.subtipo)!=-1).subtipo
            if (orientacao=="Frontal") orientacao="Lateral"


            let frontais={
                normal:barracaChapeu.filter(el=>el.frontal==true && !el.annex),
                anexo:barracaChapeu.filter(el=>el.frontal==true && el.annex),
            }
            this.$set(this.geral[tipo],fila.localizacao,{
                orientacao, //String
                frontais, //Array
                elementos:barracaChapeu //Array
            })

        }
        for (let [index,fila] of this.fila.chapeus.entries()){
            let tipo="chapeus"
            let numFila=index+1  //Human numbers
            let barracaChapeu
            if(alternativeDate===undefined){
                barracaChapeu=await $.get(`/api/v1/fila/${tipo}/${numFila}`)
            }else{
                barracaChapeu=await $.get(`/api/v1/fila/${tipo}/${numFila}/${alternativeDate}`)
            }
            let orientacao=barracaChapeu.find(el=>["Traseira","Lateral"].indexOf(el.subtipo)!=-1).subtipo

            let frontais={
                normal:barracaChapeu.filter(el=>el.frontal==true && !el.annex),
                anexo:barracaChapeu.filter(el=>el.frontal==true && el.annex),
            }
            this.$set(this.geral[tipo],fila.localizacao,{
                orientacao, //String
                frontais, //Array
                elementos:barracaChapeu //Array
            })

        }
    }
})