let scriptTarget=document.getElementById('actions')
var pathname=document.location.pathname
var paths=pathname.split("/").splice(1)
let url

if (paths[0]==="install"){
    url="/javascripts/dynamic/installer/init.js";
}
if (paths[0]==="admin"){
    url="/javascripts/dynamic/index/init.js";
}
if(paths[0]===""){
    url="/javascripts/dynamic/index/init.js"
}
if(paths[0]==="informacao"){
    url="/javascripts/dynamic/info/init.js"
}
if(paths[0]==="chapeus" || paths[0]==="barracas"){
    url="/javascripts/dynamic/fila/init.js"
}


var script = document.createElement('script');
if(url !== undefined){
    script.src = url;
    scriptTarget.parentNode.insertBefore(script, scriptTarget);
}


currentWidth=$('meta[name|="viewport"]').attr("content")
displayWidth=currentWidth.replace(/width=\d+/,"width="+window.outerWidth)
$('meta[name|="viewport"]').attr("content",displayWidth)