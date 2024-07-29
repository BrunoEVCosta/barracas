window.app=new Vue({
    el:"#app",
    data:{
        comment:""
    },
    computed:{

    },
    methods:{
        async saveComment(){
            await $.post(`/api/v1/set/note/main`, {data:this.comment})
        }
    },
    async beforeMount(){
        this.comment=await $.get(`/api/v1/get/note/main`)
    }
})