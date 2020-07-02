$(document).ready(function(){
	var load=$('.general-schema').attr('load')
	if (load){
		$('.barracas').each(function(){
		  let fila=$(this).attr("fila")
		  loadFilaBarracas(fila)
		})
		function loadFilaBarracas(fila){
			$.get(`/barracas/fila/${fila}`,function(data){
				filaBarracas=$.parseHTML(data)[4]
				$(`.barracas[fila|="${fila}"`).append(filaBarracas)
			},"html")			
		}
		$.get("/chapeus/fila/1",function(data){
			fila5=$.parseHTML(data)[4]
			$('.chapeus-fila-1').append(fila5)
		},"html")
		$.get("/chapeus/fila/2",function(data){
			fila5=$.parseHTML(data)[4]
			$('.chapeus-fila-2').append(fila5)
		},"html")
	}
})	