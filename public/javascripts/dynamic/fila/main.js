
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
                    var dialog=confirm("Quer alugar a barraca "+this.item.number+" por "+price+"€?")
                    if (dialog == true) {
                        let result = await $.post("/alugar/barraca/" + this.item.id, {price})
                        //this.vm
                        this.$el.classList.remove("show")
                        this.item.rented=true
                        this.item.rentId=result.id
                        let now=this.nowDate();
                        //now only has the granularity of a day
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
window.app=new Vue({
    el:"#app",
    data:{
        subTipos:[],
        duracoes:[],
        precos:[{}],
        barracaChapeu:[{}],
        tipo:"",
        numFila:"",
        orientation:"",
        valorReserva:undefined,
    },
    computed:{

    },
    methods:{

    },
    async beforeMount(){
        this.tipo=location.pathname.split("/")[1]
        this.numFila=location.pathname.split("/")[3]
        this.subTipos=await $.get("/api/v1/list/subTypes")
        this.duracoes=await $.get("/api/v1/list/durations")
        this.precos=await $.get("/api/v1/list/prices")
        this.barracaChapeu=await $.get(`/api/v1/fila/${this.tipo}/${this.numFila}`)
        //Gets first match
        this.orientation=this.barracaChapeu.find(el=>["Traseira","Lateral"].indexOf(el.subtipo)!=-1).subtipo
    }
})