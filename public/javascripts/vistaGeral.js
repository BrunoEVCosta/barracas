$(document).ready(function(){
	var load=$('.general-schema').attr('load')
	if (load){
		$.get("/fila/1",function(data){
			console.log($.parseHTML(data)[5]);
			fila1=$.parseHTML(data)[4]
			$('.fila-1').append(fila1)
		},"html")
		$.get("/fila/2",function(data){
			console.log($.parseHTML(data)[5]);
			fila2=$.parseHTML(data)[4]
			$('.fila-2').append(fila2)
		},"html")
		$.get("/fila/4",function(data){
			console.log($.parseHTML(data)[5]);
			fila4=$.parseHTML(data)[4]
			$('.fila-4').append(fila4)
		},"html")
		$.get("/fila/5",function(data){
			console.log($.parseHTML(data)[5]);
			fila5=$.parseHTML(data)[4]
			$('.fila-5').append(fila5)
		},"html")
	}
})	