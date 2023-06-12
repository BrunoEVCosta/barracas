let scriptTarget=document.getElementById('actions')
var pathname=document.location.pathname
var paths=pathname.split("/").splice(1)
let url

if (paths[0]==="install"){
    url="/javascripts/installer/init.js";
}


var script = document.createElement('script');
if(url !== undefined){
    script.src = url;
    scriptTarget.parentNode.insertBefore(script, scriptTarget);
}
