window.app=new Vue({
    el:"#app",
    data:{
        foo:'bar',
    },
    computed:{

    },
    methods:{
        isActive(mes){
            let mesVista=location.pathname.split('/')[4]
            return mes==mesVista
        },
        showFunctions(el){
            let tr=el.target.closest('tr')
            tr.setAttribute("editing","true")
            let td=tr.getElementsByClassName('funcoes')[0]
            td.classList.remove('d-none')
            
        },

    },
    async beforeMount(){


    }
})