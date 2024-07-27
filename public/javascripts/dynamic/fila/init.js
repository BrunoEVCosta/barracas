$(document).ready(function(){


    var pathname=document.location.pathname
    var paths=pathname.split("/").splice(1)
    scriptName=[]


    if(paths[1]=="fila"){
        scriptName=[
            "main"
        ]
    }
    //Should overwrite fila
    if(paths[3]=="mudar"){
        scriptName=[
            'mudar'
        ]
    }


    scriptTarget = $('script#actions')[0];
    scriptName.forEach(scriptName=>{
        let url=""
        if(isName(scriptName)){
            url="/javascripts/dynamic/fila/"+scriptName+".js";
        }else{
            url=scriptName
        }
        let script = document.createElement('script');
        script.src = url;
        scriptTarget.parentNode.insertBefore(script, scriptTarget);
    })

    function isName(script){
        return script.split("/").length==1
    }



});


