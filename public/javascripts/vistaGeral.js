$(document).ready(function(){
	var load=$('.general-schema').attr('load')
	if (load){
		$('.barracas').each(function(){
		  let fila=$(this).attr("fila")
		  loadFilaBarracas(fila)
		})
		function loadFilaBarracas(fila){
			$.get(`/barracas/fila/${fila}`,function(data){
				let filaBarracas=$.parseHTML(data)
				filaBarracas=filaBarracas.find(el=>el.id=="app")
				$(`.barracas[fila|="${fila}"`).append(filaBarracas)
			},"html")			
		}
		$.get("/chapeus/fila/1",function(data){
			fila5=$.parseHTML(data)[6]
			$('.chapeus-fila-1').append(fila5)
		},"html")
		$.get("/chapeus/fila/2",function(data){
			fila5=$.parseHTML(data)[6]
			$('.chapeus-fila-2').append(fila5)
		},"html")
	}
})	