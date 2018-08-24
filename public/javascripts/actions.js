$(document).ready(function(){

	$('.aluguer .btn').click(function(){
		var tent=$(this).closest('.collapse').prev('button.tent')
		var tentId=tent.attr('id');
		var price=$(this).attr('price')
		var collapse=$(this).closest('.collapse')
		var dialog=confirm("Quer alugar a barraca "+tent.html()+" por "+price+"€?")
		if (dialog== true){
			$.get("/alugar/barraca/"+tentId+"?price="+encodeURI(price), function(data){
					collapse.removeClass('show')
					tent.attr('rented','true')
				}
			)
		}else{
			collapse.removeClass('show')
		}
	})

	$('.aluguer input#otherValue').change(function(){
		var price = $(this).val()
		$(this).next().next().attr('price',price);
	})

})