window.app=new Vue({
    el:"#app",
    data:{
        subTipos:[],
        duracoes:[],
        precos:[{}],
        title:{
            en:"Information on Renting Tents of Sun Umbrellas",
            pt:"Informações sobre aluguer de barracas e chapéus",
            fr:"Informations sur la location de tentes ou de parasols",
            de:"Informationen zum Mieten von Zelten und Sonnenschirmen"
        },
        availableLanguages:["en","pt","fr","de"],
        text:{
            en:"To rent a tent or a sun umbrella. You should go to the beach station, where the green flag is displayed, the one located directly in front of the \"O Banheiro\" café. If you cannot find the person in charge of renting, ask the lifeguard, who will tell you who is responsible for renting. For more information see the map below.",
            pt:"Para alugar uma barraca ou um chapéu de sol. Deve dirigir-se junto do posto de praia, onde está a bandeira verde, a que se encontra directamente em frente ao café \"O Banheiro\". Caso não encontre a pessoa responsável pergunte ao nadador salvador, que lhe indicará quem é o responsável. Para mais informações consulte o mapa abaixo.",
            fr:"Pour louer une tente ou un parasol. Vous devez vous rendre à la station balnéaire, où est affiché le drapeau vert, celle située juste en face du café \"O Banheiro\". Si vous ne trouvez pas la personne chargée de la location, adressez-vous au sauveteur qui vous indiquera qui est responsable de la location. Pour plus d'informations, consultez la carte ci-dessous.",
            de:"Mieten Sie ein Zelt oder einen Sonnenschirm. Sie sollten zur Strandstation gehen, wo die grüne Flagge weht, die sich direkt vor dem Café „O Banheiro“ befindet. Wenn Sie die für die Vermietung zuständige Person nicht finden können, fragen Sie den Rettungsschwimmer, der Ihnen sagen wird, wer für die Vermietung verantwortlich ist. Weitere Informationen finden Sie auf der Karte unten.",
        },
        language:""
    },
    computed:{

    },
    methods:{

    },
    async beforeMount(){
        this.subTipos=await $.get("/api/v1/list/subTypes")
        this.duracoes=await $.get("/api/v1/list/durations")
        this.precos=await $.get("/api/v1/list/prices")
        let language=navigator.language || navigator.userLanguage
        language=language.split("-")[0]
        if(this.availableLanguages.indexOf(language)!=-1){
            this.language=language
        }else{
            this.language=en
        }
        document.createElement("meta")
        $('html').attr("lang",language)

    }
})