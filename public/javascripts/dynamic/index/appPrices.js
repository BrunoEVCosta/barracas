

window.app=new Vue({
    el:"#app",
    data:{
        subTipos:[],
        duracoes:[],
        precos:[{}]
    },
    computed:{

    },
    methods:{
        async updatePrice(el){
            let target=el.target
            let attributes=target.attributes
            let type=attributes.tipo.value
            let subtype=attributes.subtipo.value
            let duration=attributes.periodo.value
            let extra = undefined
            if(attributes.extra) extra=attributes.extra.value
            this.precos[type][subtype][duration].tipo=type
            this.precos[type][subtype][duration].subTipo=subtype
            this.precos[type][subtype][duration].duracao=duration
            this.precos[type][subtype][duration].extra=extra
            let result=await $.post('/api/v1/set/price',this.precos[type][subtype][duration])
            if(result.name){
                displayToast(result.name,result.message)
                target.classList.add("bg-danget")
                target.
                setTimeout(function(){
                    target.classList.remove('bg-danger')
                },3000)
            }
            this.precos[type][subtype][duration].id=result.id
            target.classList.add("bg-success")
            setTimeout(function(){
                target.classList.remove('bg-success')
            },3000)
        },
    },
    async beforeMount(){
        this.subTipos=await $.get("/api/v1/list/subTypes")
        this.duracoes=await $.get("/api/v1/list/durations")
        this.precos=await $.get("/api/v1/list/prices")
    }
})