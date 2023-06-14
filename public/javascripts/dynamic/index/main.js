

window.app=new Vue({
    el:"#app",
    data:{
        barracas:[{}],
        chapeus:[{}],
    },
    computed:{

    },
    methods:{

    },
    async beforeMount(){
        this.barracas=await $.get("/api/v1/list/rows/Barraca")
        this.chapeus=await $.get("/api/v1/list/rows/Chapeu")
    }
})