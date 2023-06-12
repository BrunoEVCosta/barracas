

window.app=new Vue({
    el:"#setup",
    data:{
        rows:0,

    },
    computed:{
        rowInter:function (){

            return new Array(this.rows)
        }
    },
    methods:{

    },
    async beforeMount(){

    }
})