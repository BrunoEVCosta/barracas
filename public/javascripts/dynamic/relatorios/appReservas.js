Vue.component("reserva",(resolve,reject)=>{
    $.get('/factory/vue/reservas-tr',(data,textStatus,jqXHR)=>{
        resolve({
            template:data,
            props:{
                reserva:Object,
                hiddenColumns:Array,
                rowOptions:Object,
                userId:String,
                removeCancelled: Boolean,
            },
            data:function(){
                return {
                    editing:false,
                    functions:false,
                    fila:{localizacao:this.reserva.fila,},
                    itemsDaFila:[{}],
                    newItem:{number:this.reserva["#"],id:this.reserva.espacoId},
                    //TODO deprecation notice. Keep the item in db output for the column support.
                    //inicioFim:this.reserva['Inicio-Fim'],
                    inicio:this.reserva.inicio,
                    fim:this.reserva.fim,
                    nome:this.reserva.nome,
                    valor:this.reserva.valor,
                }
            },
            computed:{
                hasExpired(){
                    let now=new Date()
                    let end=new Date(this.fim)
                    if(end<now && this.reserva.Cancelado==false){
                        return true
                    }else{
                        return false
                    }
                }
            },
            methods:{
                async definirComoPago(){
                    let data={
                      reservaId:this.reserva.reservaId,
                      valor:this.reserva.valor,
                      pago:true,
                      operadorId:this.userId
                    }
                    let artigoIndefinido= this.reserva.tipo=="Barraca"? "a" : "o"
                    let dialog=confirm(`Definir ${artigoIndefinido} ${this.reserva.tipo} ${this.reserva['#']} como pago?`)
                    if (dialog == true) {
                        let result = await $.ajax({
                            url: "/api/v1/set/pago",
                            type: "POST",
                            dataType: "json",
                            data,
                            success: function (data, textStatus, jqXHR) {
                                if(data.pago){
                                    if(data.pago==true) location.reload()
                                }else{
                                    displayToast("Erro ao definir como pago!",data)
                                }
                            }
                        })
                    }
                },
                async activatePickDate(){
                    $('.cc-revoke').removeClass("cc-bottom")
                    $('.cc-revoke').addClass("cc-top")
                    const DateTime=easepick.DateTime
                    let that=this
                    let reservas=await this.reservas(this.newItem.id)
                    reservas=reservas.map(d=>{
                        const start = new DateTime(d.inicio, 'YYYY-MM-DD');
                        const end = new DateTime(d.fim, 'YYYY-MM-DD');
                        const reservaInicio=new DateTime(this.reserva.inicio,'YYYY-MM-DD')
                        if(start.valueOf()!=reservaInicio.valueOf()){
                            return [start, end];
                        }
                    })
                    reservas=reservas.filter(data=>data!=undefined)
                    let plugins=[]
                    if(reservas.length==0){
                        plugins=['RangePlugin']
                    }else{
                        plugins=['RangePlugin', 'LockPlugin']
                    }
                    const picker = new easepick.easepick.create({
                        element: document.getElementById('datepicker'+this.reserva.reservaId),
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
                            startDate:that.reserva.inicio,
                            endDate:that.reserva.fim
                        },
                        //calendars:2,
                        //grid:2,
                        zIndex:1003,
                        inline:true,
                        setup(picker) {
                            picker.on('select',e=>{
                                const {start,end}=e.detail
                                that.inicio=start
                                that.fim=end
                            })
                        },
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
                },
                cancelarReserva(){
                    let preposicao= this.reserva.tipo=="Barraca"? "da" : "do"
                    var dialog=confirm(`Tem a certeza que quer cancelar a reserva ${preposicao} ${this.reserva.tipo} ${this.reserva['#']}?`)
                    if (dialog == true) {
                        data={
                            barracaChapeuId:this.newItem.id,
                            nome:this.nome,
                            id:this.reserva.reservaId,  //reserva
                            inicio:this.inicio,
                            fim:this.fim,
                            valor:this.valor,
                            userId:this.userId,
                            del:1
                        }
                        let that=this
                        $.ajax({
                            type:"POST",
                            url:"/alterar/reserva/datas",
                            data:data,
                            dataType:'json',
                            success: function(data,textStatus,jqXHR){
                                that.editing=false
                                location.reload()
                            },
                            error: function(err){
                                let resJSON=err.responseJSON
                                displayToast(`Erro ${resJSON.name} ao atualizar informação: `,resJSON.original.sqlMessage)
                            }
                        })

                    }
                },
                async reservas(id){
                    let now=new Date()
                    let anoCorrente=now.getFullYear()
                    return await $.get(`/api/v1/reservas/${anoCorrente}/${id}`)
                },
                async salvarModificacao(){
                    let that=this
                    let reservedNewLocation={created:false}
                    let editReserve=false
                    data = {
                        barracaChapeuId: this.newItem.id,
                        nome: this.nome,
                        id: this.reserva.reservaId,  //reserva
                        inicio: this.inicio,
                        fim: this.fim,
                        valor: this.valor,
                        userId: this.userId
                    }
                    //MayBe do this to all.
                    if(this.reserva.espacoId != this.newItem.id) {
                    //if(1 == 1) {

                        reservedNewLocation=await $.ajax({
                            type:'POST',
                            url:"/api/v1/reserve/item",
                            data:{
                                barracaChapeusId:data.barracaChapeuId,
                                nome:data.nome,
                                inicio:data.inicio,
                                fim:data.fim,
                                valor:data.valor,
                                operadorId:data.userId
                            },
                            dataType:'json',
                            success:function(data,textStatus,jqXHR){
                                if(data.created){
                                    return data.created
                                }else{
                                    return {created:false}
                                }

                            },
                        })
                        data.del=1
                    }else{
                        editReserve=true
                    }
                    if(reservedNewLocation.created==true || editReserve==true){
                        $.ajax({
                            type:"POST",
                            url:"/alterar/reserva/datas",
                            data:data,
                            dataType:'json',
                            success: function(data,textStatus,jqXHR){
                                that.editing=false
                                location.reload()
                            },
                            error: function(err){
                                let resJSON=err.responseJSON
                                displayToast(`Erro ${resJSON.name} ao atualizar informação: `,resJSON.original.sqlMessage)
                            }
                        })
                    }

                },
                showFunctions(){
                    if(this.functions && this.editing==false){
                        this.functions=false
                    }else {
                        this.functions = true
                    }
                },
                async toggleEditing(){
                    if(this.editing){
                        this.editing=false
                    }else {
                        this.editing = true
                        await this.activatePickDate()
                    }
                },
                hideColumn(key){
                    return this.hiddenColumns.indexOf(key)>-1
                },
                async loadRowOptions(){
                    if (Object.keys(this.fila).length>0){
                        let tipo=this.reserva.tipo.toLowerCase()+"s"
                        let fila=this.fila.localizacao.replace(/^.*\W([0-9]+)$/g,"$1")
                        this.itemsDaFila=await $.get(`/api/v1/fila/${tipo}/${fila}`)
                    }else {
                        this.itemsDaFila=[{}]
                    }

                }
            },
            async beforeMount() {

            }
        })
    })
})
Vue.component('v-select', VueSelect)
window.app=new Vue({
    el:"#app",
    data:{
        foo:'bar',
        reservas:[{}],
        vista:{
            mes:"00",
            ano:"00"
        },
        hiddenColumns:["reservaId","espacoId","inicio","fim","inicioLong","fimLong","operadorId","subTipo"],
        rowOptions:{
            barraca:[{localizacao:"Fila 1"}],
            chapeu:[{localizacao:"Fila Chapeu 1"}]
        },
        userId:-1,
        removeCancelled:true
    },
    computed:{

    },
    methods:{
        isActive(mes){
            return mes==this.vista.mes
        },
    },
    async beforeMount(){
        try{
            this.rowOptions.barraca=await $.get(`/api/v1/list/rows/barraca`)
            this.rowOptions.chapeu=await $.get(`/api/v1/list/rows/chapeu`)
            this.vista.ano=location.pathname.split('/')[3]
            this.vista.mes=location.pathname.split('/')[4]
            let dados=await $.get(`/api/v1/relatorios/reservas/${this.vista.ano}/${this.vista.mes}`)
            let userId=await $.get("/api/v1/get/userId")
            this.userId=userId.userId
            this.reservas=dados.rows
        }catch (e) {
            displayToast("Unable to load data",e)
        }
        
    }
})
