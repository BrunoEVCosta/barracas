
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
                    outroPreco:0.00,

                }

            },
            computed:{},
            methods:{
                mudarAluguer(){
                  location.pathname=`/${this.tipo.toLowerCase()}s/fila/${this.item.number}/mudar`
                },
                async alugar(el){
                    let price=el.target.attributes.price.value
                    let duracao=el.target.attributes.duracao.value
                    let artigoIndefinido=this.tipo=="Barraca"?"a":"o"
                    var dialog=confirm(`Quer alugar ${artigoIndefinido} ${this.tipo} ${this.item.number} por ${price}€?`)
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
                async reservas(id){
                    let now=new Date()
                    let anoCorrente=now.getFullYear()
                    let mesCorrente=this.pad((now.getMonth()+1),2)
                    return await $.get(`/api/v1/reservas/${anoCorrente}/${id}`)
                },
                async reservar(){
                    let collapse=this.$el
                    let that=this
                    $('.cc-revoke').removeClass("cc-bottom")
                    $('.cc-revoke').addClass("cc-top")
                    const DateTime=easepick.DateTime
                    let reservas=await this.reservas(this.item.id)
                    reservas=reservas.map(d=>{
                        const start = new DateTime(d.inicio, 'YYYY-MM-DD');
                        const end = new DateTime(d.fim, 'YYYY-MM-DD');

                        return [start, end];
                    })
                    let plugins=[]
                    if(reservas.length==0){
                        plugins=['RangePlugin']
                    }else{
                        plugins=['RangePlugin', 'LockPlugin']
                    }
                    const picker = new easepick.easepick.create({
                        element: document.getElementById('datepicker'),
                        css: [
                            'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
                            'https://easepick.com/css/demo_hotelcal.css',
                        ],
                        plugins,
                        RangePlugin: {
                            tooltipNumber(num) {
                                return num - 1;
                            },
                            locale: {
                                one: 'day',
                                other: 'days',
                            },
                        },
                        //calendars:2,
                        //grid:2,
                        zIndex:1003,
                        LockPlugin: {
                            minDate: new Date(),
                            minDays: 2,
                            inseparable: true,
                            filter(date, picked) {
                                if (picked.length === 1) {
                                    const incl = date.isBefore(picked[0]) ? '[)' : '(]';
                                    return !picked[0].isSame(date, 'day') && date.inArray(reservas, incl);
                                }

                                return date.inArray(reservas, '[)');
                            },
                        }
                    });

                    
                    //Load values on modal
                    $('.modal#reserveTent input.id').val(this.item.id)
                    $('.modal#reserveTent').modal('show');
                    

                    $('.modal#reserveTent button.reservar').click(function(){
                        $('.cc-revoke').removeClass("cc-top")
                        $('.cc-revoke').addClass("cc-bottom")
                        //TODO verify has date
                        var name=$('.modal#reserveTent input#name').val()
                        var duration=$('.modal#reserveTent .date#datepicker').val()
                        let startDate=duration.split(' - ')[0]
                        var endDate=duration.split(' - ')[1]
                        var price=$('.modal#reserveTent input#price').val()
                        var pago=$('.modal#reserveTent input#pago').val()


                        





                        let artigoIndefinido=that.tipo=="Barraca"?"a":"o"
                        var dialog=confirm(`Quer reservar ${artigoIndefinido} ${that.tipo} ${that.item.number} por ${price}€?`)
                        if (dialog == true) {
                            //TODO confirm duration does not interfer with previous reservations
                            $.get("/reservar/barraca/" + that.item.id + "?name=" + name + "&startDate=" + startDate + "&endDate=" + endDate + "&price=" + encodeURI(price) + "&pago=" + pago, function (data) {
                                    $('.modal#reserveTent').modal('hide');
                                    collapse.classList.remove('show')
                                    that.item.reserved = true
                                    that.item.rentId = data.id
                                    that.item.startDate = startDate
                                    that.item.endDate = endDate
                                }
                            )
                            //TODO check result
                        }
                    })
                },
                formatedDate(date){
                    let d=new Date(date);
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
        previous:-1,
        next:-1,
        subTipos:[],
        duracoes:[],
        precos:{},
        barracas:[],
        chapeus:[],
        barracaChapeu:[{}],
        tipo:"",
        tipoPresentation:"",
        numFila:"",
        orientation:"",
        barracasFrontais:{},
        valorReserva:undefined,
    },
    computed:{

    },
    methods:{

    },
    async beforeMount(){
        this.tipo=location.pathname.split("/")[1]
        this.tipoPresentation=_.trimEnd(_.capitalize(this.tipo),"s")
        this.numFila=location.pathname.split("/")[3]
        this.barracas=await $.get("/api/v1/list/rows/Barraca")
        this.chapeus=await $.get("/api/v1/list/rows/Chapeu")
        if( this.numFila==1 ){
            this.previous = -1
        }else{
            this.previous = parseInt(this.numFila)-1
        }
        //Get a way to figure out the limits. //Index menus api call.
        if( this.numFila>=this[this.tipo].length ){
            this.next = -1
        }else{
            this.next = parseInt(this.numFila)+1
        }
        this.subTipos=await $.get("/api/v1/list/subTypes")
        this.duracoes=await $.get("/api/v1/list/durations")
        this.precos=await $.get("/api/v1/list/prices")
        this.barracaChapeu=await $.get(`/api/v1/fila/${this.tipo}/${this.numFila}`)
        this.barracasFrontais.normal=this.barracaChapeu.filter(el=>el.frontal==true && !el.annex)
        this.barracasFrontais.anexo=this.barracaChapeu.filter(el=>el.frontal==true && el.annex)
        //Gets first match
        this.orientation=this.barracaChapeu.find(el=>["Traseira","Lateral"].indexOf(el.subtipo)!=-1).subtipo
    }
})